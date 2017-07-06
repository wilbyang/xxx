import React, { Component } from 'react'
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import RadioButton from "../components/RadioButton"
import Icon from 'react-native-vector-icons/Ionicons'
import {firebaseApp} from '../stores/api'
import Firebase from 'firebase'
import clippingsStore from '../stores/clippings_store'
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Text,
  Image,
  TextInput,
  View,
  Platform
} from 'react-native'

import ImagePicker from 'react-native-image-picker';

// Prepare Blob support
import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const uploadImage = (response) => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri
    //const sessionId = new Date().getTime()
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = firebaseApp.storage().ref('images').child(`${response.fileName}`)
    let ext = response.fileName.split('.')[1].toLowerCase();
    var mime = "application/octet-stream";
    if(ext === "jpg") {
      mime = "image/jpg";
    } else if(ext === "png") {
      mime = "image/png";
    }
    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

@observer
export default class extends Component {
  @observable content = ""
  @observable isPublic = false

  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    tabBarIcon: ({tintColor}) => (
      <Icon name='md-home' color={tintColor} size={24}/>
    ),
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ height: "100%", paddingHorizontal: 20, paddingTop:10 }}>
        <Icon name='md-close' color="black" size={28}/>
      </TouchableOpacity>
    ),
    headerTitle: (
      <View style={{
        height: "100%",
        justifyContent: "center"}}>
        <Text style={{fontSize: 18}}>匿名</Text>
      </View>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.state.params.postSecret("爱情")}
        style={{
          height: 30,
          paddingHorizontal: 15,
          justifyContent: "center"}}>
        <Text style={{color: "gray", fontSize: 18}}>发表</Text>
      </TouchableOpacity>
    )
  })

  componentWillMount() {
    this.props.navigation.setParams({
      postSecret: this._postSecret,
    });
  }
  _pickImage = () => {
    this.setState({ uploadURL: '' })

    ImagePicker.showImagePicker({
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }, response  => {
      uploadImage(response)
        .then(url => this.setState({ uploadURL: url }))
        .catch(error => console.log(error))
    })
  }
  toggle = action("togglePublic", () => {
    this.isPublic = !this.isPublic
  })

  _postSecret = (topic) => {
    let secretsRef = firebaseApp.database().ref(`secret/话题/${topic}`)
    secretsRef.push({txt:this.content, image:'', user:clippingsStore.currentUser.uid, date: Firebase.database.ServerValue.TIMESTAMP,}).then(() => {
      this.props.navigation.goBack()
    })
  }

  render() {
    const { placeholder = "发秘密到朋友圈" } = this.props

    return (
      <View style={styles.container}>
        <TextInput
          multiline
          style={styles.textArea}
          value={this.content}
          onChangeText={action("changeContent", content => this.content = content)}
          placeholder={placeholder}
          placeholderTextColor='#999'
          underlineColorAndroid='transparent' />
        <KeyboardAvoidingView keyboardVerticalOffset={-64} behavior="position">
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={this.toggle}
              style={styles.leftPart}>
              <RadioButton onPress={this.toggle} value={this.isPublic} style={styles.radio} />
              <Text style={styles.radioText}>仅圈内可评论</Text>
            </TouchableOpacity>
            <View style={styles.rightPart}>
              <TouchableOpacity
                onPress={this._pickImage}
                style={styles.action}>
                <Icon name='md-image' color="black" size={36}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.action} >
                <View />
              </TouchableOpacity>
              <TouchableOpacity style={styles.action} >
                <View />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10
  },
  textArea: {
    flex: 1,
    color: '#333',
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '200'
  },
  footer: {
    height: 32,
    borderTopWidth: 1,
    borderColor: "gray",
    flexDirection: "row"
  },
  leftPart: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  radio: {
    marginLeft: 12
  },
  radioText: {
    color: "gray",
    marginLeft: 8
  },
  rightPart: {
    width: 120,
    flexDirection: "row"
  },
  action: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray"
  }
})
