import React, {Component} from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn, signedInByFirebase } from "../auth";

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
              signedInByFirebase(this.state.email, this.state.pwd).then(() => this.props.navigation.navigate("SignedIn"));
            }}
          />
        </Card>
      </View>
    );
  }
}
