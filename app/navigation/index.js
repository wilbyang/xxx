import { TabNavigator, StackNavigator } from 'react-navigation';
import WelcomeScreen from '../containers/welcome_screen';
import SecondScreen from '../containers/second_screen';
import ClippingsScreen from '../containers/clippings_screen';
import AVMedia from '../containers/av_media';
import ChatScreen from '../containers/chat_screen';
import ThirdScreen from '../containers/third_screen';
import FaHen from '../containers/fahen_screen';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Player from '../components/player';

export const SignedOut = StackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In"
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up"
    }
  },
});

const WelcomeTab = StackNavigator({
  ClippingsScreen: { screen: ClippingsScreen },

  SecondScreen: { screen: SecondScreen },
});

const AVMediaTab = StackNavigator({
  AVMedia: { screen: AVMedia },
  PlayerScreen: { screen: Player },
})
const MyTab = StackNavigator({
  ChatScreen: { screen: ChatScreen },
  ThirdScreen: { screen: ThirdScreen },
})
const FahenTab = StackNavigator({
  ChatScreen: { screen: FaHen },
  WelcomeScreen: { screen: WelcomeScreen },
})

export const Nav = TabNavigator({
  Home: { screen: WelcomeTab },
  AVMedia: { screen: AVMediaTab },
  Map: { screen: MyTab },
  FaHen: { screen: FahenTab },
});

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: Nav,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
