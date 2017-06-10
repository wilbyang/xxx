import React, { Component } from 'react'
import { Text, View, StyleSheet,Platform } from 'react-native'
import Button from 'react-native-button'
import { observer } from 'mobx-react/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Video from 'react-native-video'
import { Player } from 'react-native-audio-streaming';

import ApplicationStyles from '../styles'


@observer
export default class AVMedia extends Component {
  static navigationOptions = {
    title: '多媒体',
    tabBarIcon: ({tintColor}) => (
      <Icon name='user' color={tintColor} size={24}/>
    )
  };

  render() {
    return (
      <View style={[styles.container, ApplicationStyles.container]}>
        <Player url={"http://lacavewebradio.chickenkiller.com:8000/stream.mp3"} />
        <Button onPress={()=>console.log("xx")} >
          To ThirdScreen
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo:{
    width:200,
    height:200
  },
  welcome: {
    textAlign: 'center',
    margin: 10
  },
});
