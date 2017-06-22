import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, ListView, TouchableHighlight, RefreshControl, FlatList } from 'react-native';
import Button from 'react-native-button';
import { observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ApplicationStyles from '../styles';

import clippingsStore from '../stores/clippings_store';
import I18n from 'react-native-i18n';
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
export default class CounterScreen extends Component {
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
          renderItem={({item}) => this._renderRow(item)}
        />
      </View>
    )
  }

  _keyExtractor = (item, index) => item.Date;

  _bookmark = (data) => {

  }
  _renderRow = (data) => {
    return (
      <TouchableHighlight underlayColor="gray" onLongPress={()=>console.log("xxgg")}>
        <View style={{padding:12}}>
          <Text style={styles.textHead}>{data.Title }</Text>
          <Text style={styles.textContent}>{data.Content}</Text>
          <View style={{flexDirection:"row", justifyContent:"space-around"}}>
            <Icon name='bookmark'  size={16}/>
            <Icon name='thumbs-up' size={16}/>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _onEndReached = () => {

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
