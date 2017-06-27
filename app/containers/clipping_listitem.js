import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Animated} from 'react-native';
import { observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/FontAwesome';

@observer
export default class ClippingIteminList extends Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }
  render() {
    if (this.props.item.expanded) {
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 20,
          duration: 800,
        }
      ).start();
    } else {
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 0,
          duration: 800,
        }
      ).start();
    }
    return (
      <View style={{padding:12}}>
        <TouchableHighlight  underlayColor="gray" onLongPress={() => this.props.item.toggleOperation()}>
          <Text style={styles.textContent}>{this.props.item.Content}</Text>
        </TouchableHighlight>
        <Animated.View style={{overflow:"hidden", marginTop:16, flexDirection:"row", justifyContent:"space-around", height: this.state.fadeAnim}}>
          <TouchableHighlight onPress={()=>console.log("bookmark")}><Icon name='bookmark'  size={16} color="grey" /></TouchableHighlight>
          <TouchableHighlight onPress={()=>console.log("up")}><Icon name='thumbs-up' size={16} color="grey" /></TouchableHighlight>
          <TouchableHighlight onPress={()=>console.log("down")}><Icon name='thumbs-down' size={16} color="grey" /></TouchableHighlight>
        </Animated.View>
      </View>
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
