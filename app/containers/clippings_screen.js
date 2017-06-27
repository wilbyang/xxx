import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, ListView, TouchableHighlight, RefreshControl, FlatList } from 'react-native';
import { observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ApplicationStyles from '../styles';
import clippingsStore from '../stores/clippings_store';
import {firebaseApp} from '../stores/api'
import ClippingIteminList from './clipping_listitem'

import I18n from 'react-native-i18n';
import {Motion, spring} from 'react-motion';
I18n.fallbacks = true
I18n.translations = {
  en: {
    title: '摘抄'
  },
  fr: {
    title: 'Bonjour!'
  }
}
@observer
export default class ClippingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing:false
    };
  }
  componentDidMount() {
    clippingsStore.getClippings();
  }
  static navigationOptions = {
    title: I18n.t('title'),
    tabBarIcon: ({tintColor}) => (
      <Icon name='plug' color={tintColor} size={24}/>
    )
  };

  render() {
    return (
      <View style={[styles.container, ApplicationStyles.container]}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={clippingsStore.loading}
              onRefresh={() => clippingsStore.getClippings()}
            />
          }
          keyExtractor={this._keyExtractor}
          data={clippingsStore.clippings}
          renderItem={({item, index}) => this._renderRow(item, index)}
        />

        <Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
          {value => <Text>{value.x}</Text>}
        </Motion>
      </View>
    )
  }

  _keyExtractor = (item, index) => item.Date;

  _bookmark = () => {
    let ref = 'user/' + clippingsStore.user.uid + '/bookmarks'
    //firebaseApp.database().ref(ref).push({cid: "xxhh"});
  }
  _renderRow = (item, index) => {
    return (
      <ClippingIteminList item = {item} index = {index}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textRed: {
    color: 'red',
  },
  textHead: {
    fontSize:18,
    paddingBottom:6
  },
  textContent: {
    paddingTop:6,
    lineHeight:20
  },
});
