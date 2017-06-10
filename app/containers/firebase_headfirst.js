import firebase from 'firebase'
import React, { Component, PropTypes } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ListView } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'
import Icon from 'react-native-vector-icons/FontAwesome'

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
      <View>
        <ListView dataSource = {this.state.dataSource}
                  renderRow={this._renderRow.bind(this)}
                  style = {styles.listview} />

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  listview:{}
});