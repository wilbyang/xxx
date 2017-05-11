import React, { Component, PropTypes } from 'react'
import { Text, View, StyleSheet, ListView, TouchableOpacity } from 'react-native'
import Button from 'react-native-button'
import { observer } from 'mobx-react/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ApplicationStyles from '../styles'

import counterStore from '../stores/counter_store'

@observer
export default class CounterScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
    title: 'Counter Screen',
  };
  ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => {
      return r1 !== r2
    }
  });
  render() {
    return (
      <View style={[styles.container, ApplicationStyles.container]}>
        <Icon style={styles.welcome} name='building' size={30}></Icon>
        <Button onPress={ ()=> counterStore.getFromRemote() }>
          Back
        </Button>
        <ListView
          enableEmptySections={true}
          automaticallyAdjustContentInsets={true}
          initialListSize={1}
          dataSource={this.ds.cloneWithRows(counterStore.clippings.slice())}
          renderRow={this._renderRow}
          onEndReachedThreshold={1}
        />

      </View>
    )
  }

  _renderRow = (data) => {
    return (
      <TouchableOpacity>
        <View style={{paddingTop:12}}>
          <Text>{data.Title }</Text>
          <Text>{data.Content}</Text>
          <Text>{data.URL}</Text>
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
});
