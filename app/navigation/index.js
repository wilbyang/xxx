import { TabNavigator, StackNavigator } from 'react-navigation';
;
import WelcomeScreen from '../containers/welcome_screen';
import SecondScreen from '../containers/second_screen';
import ClippingsScreen from '../containers/clippings_screen';
import AVMedia from '../containers/av_media';
import FirebaseHeadFirst from '../containers/firebase_headfirst';
import ThirdScreen from '../containers/third_screen';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';


export const SignedOut = StackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up"
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In"
    }
  }
});


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

export const Nav = TabNavigator({
  Home: { screen: WelcomeTab },
  AVMedia: { screen: AVMediaTab },
  Map: { screen: MyTab },
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
