'use strict';
import React, {Component} from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  ListView,
  View,
  Image,
} from 'react-native';
import clippingsStore from '../stores/clippings_store';
import { observer } from 'mobx-react/native';
@observer
export default class ArtistListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={() => {clippingsStore.setArtistIndex(1);this.props.nav.navigate("PlayerScreen");}} activeOpacity={ 100 } underlayColor="#ea4b54">
        <Image
          style={ styles.artistBg }
          resizeMode='cover'
          source={{uri:  this.props.artist.background  }}
        >
          <View style={ styles.container }>
            <Text style={ styles.artistName }>{ this.props.artist.name }</Text>
            <Text style={ styles.artistSongs }>{ this.props.artist.songs.length } songs</Text>
          </View>
        </Image>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding:20,
  },
  artistName: {
    color: "#FFF",
    backgroundColor: 'transparent',
    fontFamily: "Helvetica Neue",
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 5
  },
  artistSongs: {
    color: "#CCC",
    backgroundColor: 'transparent',
    fontFamily: "Helvetica Neue",
    fontWeight: "300",
    fontSize: 14
  },
});