import React from 'react'
import { AppRegistry } from 'react-native'
import Root from './app/root'

AppRegistry.registerComponent('xxx', () => Root)
console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: BackAndroid', 'Warning: You are manually calling a React.PropTypes validation']