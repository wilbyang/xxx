import React, {Component} from "react";
import { View, Text } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn, signedInByFirebase } from "../auth";
import { observer } from 'mobx-react/native';
import clippingsStore from '../stores/clippings_store';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;
@observer
export default class FirebaseHeadFirst extends Component {
  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <FormLabel>Email</FormLabel>
          <FormInput onChangeText={(text) => this.setState({email:text})} placeholder="Email address..." />
          <FormLabel>Password</FormLabel>
          <FormInput onChangeText={(text) => this.setState({pwd:text})} secureTextEntry placeholder="Password..." />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN IN"
            onPress={() => {
              clippingsStore.signInWithEmailAndPassword("yang.wilby@gmail.com", "yangbo");
            }}
          />
          <LoginButton
            readPermissions={["public_profile"]}
            publishPermissions={["publish_actions"]}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert("login has error: " + result.error);
                } else if (result.isCancelled) {
                  alert("login is cancelled.");
                } else {
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      const credential = firebaseApp.auth.FacebookAuthProvider.credential(data.accessToken);
                      auth.signInWithCredential(credential).then((result) => {
                        alert("success");
                      }, (error) => {
                        alert("error");
                      })
                      alert(data.accessToken.toString())
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => alert("logout.")}/>

        </Card>
      </View>
    );
  }
}
