import React, { Component, PropTypes } from 'react'
import { Text, View, StyleSheet, ListView, TouchableOpacity } from 'react-native'
import Button from 'react-native-button'
import { observer } from 'mobx-react/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ApplicationStyles from '../styles'

import clippingsStore from '../stores/clippings_store'

@observer
export default class CounterScreen extends Component {
  componentDidMount() {
    clippingsStore.getFromRemote();
  }
  static navigationOptions = {
    title: '我的摘抄',
    tabBarIcon: ({tintColor}) => (
      <Icon name='user' color={tintColor} size={24}/>
    )
  };
  ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => {
      return r1 !== r2
    }
  });
  render() {
    return (
      <View style={[styles.container, ApplicationStyles.container]}>

        <ListView
          enableEmptySections={true}
          automaticallyAdjustContentInsets={true}
          initialListSize={1}
          dataSource={this.ds.cloneWithRows(clippingsStore.clippings.slice())}
          renderRow={this._renderRow}
          onEndReachedThreshold={1}
        />

      </View>
    )
  }

  _renderRow = (data) => {
    return (
      <TouchableOpacity>
        <View style={{padding:12}}>
          <Text style={styles.textHead}>{data.Title }</Text>
          <Text style={styles.textContent}>{data.Content}</Text>
        </View>
      </TouchableOpacity>
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
