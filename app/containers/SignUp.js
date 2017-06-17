import React, {Component} from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn, createUserWithEmailAndPassword } from "../auth";
import { observer } from 'mobx-react/native';
@observer
export default class SecondScreen extends Component {

  _createUserWithEmailAndPassword = async ()  => {

    let result = await createUserWithEmailAndPassword(this.state.email, this.state.pwd)
    this.props.navigation.navigate("SignedIn")
  }
  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <FormLabel>Email</FormLabel>
          <FormInput ref='forminput' onChangeText={(text) => this.setState({email:text})}
                     textInputRef='email' placeholder="Email address..." />
          <FormLabel>Password</FormLabel>
          <FormInput ref='forminput' onChangeText={(text) => this.setState({pwd:text})}
                     textInputRef='pwd' secureTextEntry placeholder="Password..." />
          <FormLabel>Confirm Password</FormLabel>
          <FormInput secureTextEntry placeholder="Confirm Password..." />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN UP"
            onPress={this._createUserWithEmailAndPassword.bind(this)}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Sign In"
            onPress={() => this.props.navigation.navigate("SignIn")}
          />
        </Card>
      </View>
    );
  }
}
