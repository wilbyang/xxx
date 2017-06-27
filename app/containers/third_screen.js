import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  View
} from 'react-native';

export default class FlatListDemo extends Component {
  state = {
    data: [
      {
        key: "z",
        value: "China",
        isExpand: false
      }, {
        key: "b",
        value: "Beijing",
        isExpand: false
      }, {
        key: "c",
        value: "Chengdu",
        isExpand: false
      }, {
        key: "x",
        value: "Xiaan",
        isExpand: false
      }
    ]
  }

  updateData = (item, index) => {
    const { data } = this.state

    const dataCopy = data.slice() // 浅拷贝
    dataCopy.forEach((item, indexInData) => item.isExpand = index === indexInData)

    this.setState({
      data: dataCopy
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{flex: 1}}
          data={this.state.data}
          renderItem={this.renderItem}
        />
      </View>
    )
  }

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onLongPress={() => this.updateData(item, index)}>
        <View style={styles.item}>
          <Text>{item.value}</Text>
        </View>
        {item.isExpand &&
        <View style={[styles.item, {backgroundColor: "pink"}]}>
          <Text>description: {item.value}</Text>
        </View>
        }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: '#F5FCFF',
  },
  item: {
    height: 45,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: 'center'
  }
});