import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, ListView } from 'react-native';
import Button from 'react-native-button';
import { observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import { Player } from 'react-native-audio-streaming';
import ArtistListItem from './artist_list_item';
import {Artists} from '../stores/api';
import ApplicationStyles from '../styles';


@observer
export default class AVMedia extends Component {
  static navigationOptions = {
    title: '聆听',
    tabBarIcon: ({tintColor}) => (
      <Icon name='user' color={tintColor} size={24}/>
    )
  };

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows( Artists ),
    }
  }
  render() {
    return (
      <View style={[styles.container, ApplicationStyles.container]}>

        <ListView removeClippedSubviews={false}
          dataSource={this.state.dataSource}
          renderRow={ ( artist ) => <ArtistListItem artist={ artist } nav={this.props.navigation} clickHandler={() => this.props.navigation.navigate("PlayerScreen")} /> }/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
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
