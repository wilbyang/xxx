import React, { Component } from 'react'
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import RadioButton from "../components/RadioButton"
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Text,
  Image,
  TextInput,
  View
} from 'react-native'

@observer
export default class extends Component {
  @observable content = ""
  @observable isPublic = false

  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    tabBarIcon: ({tintColor}) => (
      <Icon name='plug' color={tintColor} size={24}/>
    ),
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.goBack()}

        style={{
          height: "100%",
          paddingHorizontal: 20,
          }}>
        <Icon name='close' color="white" size={24}/>
      </TouchableOpacity>
    ),
    headerTitle: (
      <View style={{
        height: "100%",
        justifyContent: "center"}}>
        <Text style={{fontSize: 15}}>匿名</Text>
      </View>
    ),
    headerRight: (
      <TouchableOpacity style={{
        height: 30,
        paddingHorizontal: 15,
        justifyContent: "center"}}>
        <Text style={{color: "gray", fontSize: 15}}>发表</Text>
      </TouchableOpacity>
    )
  })

  toggle = () => {
    this.isPublic = !this.isPublic
  }

  render() {
    const { placeholder = "发秘密到朋友圈" } = this.props

    return (
      <View style={styles.container}>
        <TextInput
          multiline
          style={styles.textArea}
          value={this.content}
          onChangeText={content => this.content = content}
          placeholder={placeholder}
          placeholderTextColor='#999'
          underlineColorAndroid='transparent' />
        <KeyboardAvoidingView keyboardVerticalOffset={-64} behavior="position">
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={this.toggle}
              style={styles.leftPart}>
              <RadioButton onPress={this.toggle} value={this.isPublic} style={styles.radio} />
              <Text style={styles.radioText}>仅圈内可评论</Text>
            </TouchableOpacity>
            <View style={styles.rightPart}>
              <TouchableOpacity style={styles.action}>
                <View />
              </TouchableOpacity>
              <TouchableOpacity style={styles.action} >
                <View />
              </TouchableOpacity>
              <TouchableOpacity style={styles.action} >
                <View />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10
  },
  textArea: {
    flex: 1,
    color: '#333',
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '200'
  },
  footer: {
    height: 40,
    borderTopWidth: 1,
    borderColor: "gray",
    flexDirection: "row"
  },
  leftPart: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  radio: {
    marginLeft: 12
  },
  radioText: {
    color: "gray",
    marginLeft: 8
  },
  rightPart: {
    width: 120,
    flexDirection: "row"
  },
  action: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray"
  }
})
