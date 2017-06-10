import { TabNavigator, StackNavigator } from 'react-navigation'

import WelcomeScreen from '../containers/welcome_screen'
import SecondScreen from '../containers/second_screen'
import ClippingsScreen from '../containers/clippings_screen'
import AVMedia from '../containers/av_media'
import FirebaseHeadFirst from '../containers/firebase_headfirst'
import ThirdScreen from '../containers/third_screen'
import MyHomeScreen from '../containers/myhome_screen'



const WelcomeTab = StackNavigator({
  ClippingsScreen: { screen: ClippingsScreen },
  WelcomeScreen: { screen: WelcomeScreen },
  SecondScreen: { screen: SecondScreen },
});

const AVMediaTab = StackNavigator({
  AVMedia: { screen: AVMedia },
  ThirdScreen: { screen: ThirdScreen },
})
const MyTab = StackNavigator({
  FirebaseHeadFirst: { screen: FirebaseHeadFirst },
  ThirdScreen: { screen: ThirdScreen },
})

const Nav = TabNavigator({
  Home: { screen: WelcomeTab },
  AVMedia: { screen: AVMediaTab },
  Map: { screen: MyTab },
});

export default Nav
