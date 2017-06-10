import firebase from 'firebase'
import React, { Component, PropTypes } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ListView } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from "react-native-button";
import t from 'tcomb-form-native'
var Form = t.form.Form;
// here we are: define your domain model
var Message = t.struct({
  from: t.String,              // a required string
  msg: t.maybe(t.String),  // an optional string
});
var options = {};
const config = {
  apiKey: "AIzaSyCWX2plVb3pYuwRYvh5sNQZqrEnG2Y-1Ak",
  authDomain: "notonlylanguage.firebaseapp.com",
  databaseURL: "https://notonlylanguage.firebaseio.com",
  projectId: "notonlylanguage",
  storageBucket: "notonlylanguage.appspot.com",
  messagingSenderId: "532066142854"
};
firebase.initializeApp(config);

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const storage = firebase.storage();
const auth = firebase.auth();
const database = firebase.database();
const messagesRef = database.ref('chat/conversation');

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = storage.ref('images').child(`${sessionId}`)

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
export default class FirebaseHeadFirst extends Component {
  static navigationOptions = {
    title: 'Firebase',
    tabBarIcon: ({tintColor}) => (
      <Icon name='user' color={tintColor} size={24}/>
    )
  };
  constructor() {
    super();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };

  }
  componentWillMount() {

  }
  componentDidMount() {
    messagesRef.limitToLast(12).on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({

          from: child.val().from,
          content: child.val().msg,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  _renderRow(item) {
    return (
      <View>
        <Text>From: {item.from}</Text>
        <Text>{item.content}</Text>
      </View>
    );
  }
  _savetoFB() {
    var {from, msg} = this.refs.form.getValue();
    messagesRef.push({from:from, msg:msg, time:new Date().getTime()});
  }
  _pickImage() {
    this.setState({ uploadURL: '' })

    ImagePicker.launchImageLibrary({}, response  => {
      uploadImage(response.uri)
        .then(url => this.setState({ uploadURL: url }))
        .catch(error => console.log(error))
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView dataSource = {this.state.dataSource}
                  renderRow={this._renderRow.bind(this)}
                  style = {styles.listview} />
        <Form
          ref="form"
          type={Message}
          options={options}
        />
        <LoginButton
          readPermissions={["public_profile"]}
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                    auth.signInWithCredential(credential).then((result) => {
                      alert("success");
                    }, (error) => {
                      alert("error");
                    })
                    alert(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  listview:{}
});