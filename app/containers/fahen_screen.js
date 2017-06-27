import React, { Component, PropTypes } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Button from 'react-native-button'
import { observer } from 'mobx-react/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ApplicationStyles from '../styles'

import counterStore from '../stores/clippings_store'
import t from 'tcomb-form-native';
var Form = t.form.Form;

var ToDo = t.struct({
  content: t.String,              // a required string
  endDate: t.Date,  // an optional string
});
var options = {
  auto: 'placeholders',
  fields: {
    content: {
      placeholder: 'Opmerking',
      multiline: true,
      numberOfLines: 40
    }
  }
};


@observer
export default class FaHen extends Component {
  static navigationOptions = {
    title: '发狠',
    tabBarIcon: ({tintColor}) => (
      <Icon name='home' color={tintColor} size={24}/>
    )
  };

  render() {
    return (


      <View style={[styles.container, ApplicationStyles.container]}>
        <Text style={styles.text}>
          Now remote counter is {counterStore.remoteCounter}
        </Text>
        <Form style={{height:400}}
          ref="form"
          type={ToDo}
          options={options}
        />
        <Button style={ApplicationStyles.button} onPress={ ()=> counterStore.facebookMe() }>
          Click to counter screen
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height:600
  },
  welcome: {
    textAlign: 'center',
    margin: 10,
    marginTop: 100
  },
  text: {
    textAlign: 'center',
    margin: 10,
  },
  textRed: {
    color: 'red',
  },
});
