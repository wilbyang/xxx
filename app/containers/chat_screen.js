
import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ListView, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import t from 'tcomb-form-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {firebaseApp} from '../stores/api';
import { observer } from 'mobx-react/native';
import Firebase from 'firebase';

var Form = t.form.Form;
var Message = t.struct({
  from: t.String,              // a required string
  msg: t.maybe(t.String),  // an optional string
});
var options = {};
const messagesRef = firebaseApp.database().ref('user/chat');
import clippingsStore from '../stores/clippings_store';

@observer
export default class Chat extends Component {
  static navigationOptions = {
    title: '聊天',
    tabBarIcon: ({tintColor}) => (
      <Icon name='user' color={tintColor} size={24}/>
    )
  };
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }
  onSend(messages) {
    messages.forEach(function (item, index) {
      messagesRef.push({
        user: item.user,
        text: item.text,
        createdAt: Firebase.database.ServerValue.TIMESTAMP,
      });
    });
  }
  componentDidMount() {
    messagesRef.limitToLast(120).on('child_added', (snap) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, {
            _id:previousState.messages.length + 1,
            text: snap.val().text,
            createdAt: new Date(snap.val().createdAt),
            user: snap.val().user,
          }),
        }
      })
    });
  }


  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          name:clippingsStore.currentUser.email,
          _id: clippingsStore.currentUser.uid,
        }} />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  listview:{height:200, backgroundColor:"green"}
});