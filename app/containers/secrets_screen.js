/**
 * Created by wilbyang on 2017-06-29.
 */
import React, {Component} from 'react';
import {View, RefreshControl, FlatList, Text, TouchableOpacity} from 'react-native'
import clippingsStore from '../stores/clippings_store';
import {firebaseApp} from '../stores/api';
var _ = require('lodash');
import moment from 'moment';
import {Avatar} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer } from 'mobx-react/native';

@observer
class SecretsScreen extends Component {

  constructor(props){
    super(props);
  }

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
          backgroundColor: "green"}}>
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
      <TouchableOpacity
        onPress={() => navigation.navigate('PublishSecretScreen')}
        style={{
          height: 30,
          paddingHorizontal: 15,
          justifyContent: "center"}}>
        <Text style={{color: "gray", fontSize: 15}}>+</Text>
      </TouchableOpacity>
    )
  })
  componentDidMount() {
    clippingsStore.getFreshSecrets(1498734378680)
  }
  _renderRow = (item, index) => {
    //moment.locale("zh-cn")
    return (
      <View style={{padding:12}}>


        <View style={{ flexDirection:"row", justifyContent:"space-between"}}>
          <View style={{ flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>

            <View><Avatar
              medium
              rounded
              source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"}}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            /></View>

            <View><Text style={{marginLeft:48}}>上海交通大学</Text></View>
          </View>
          <View style={{ flexDirection:"row", justifyContent:"flex-start"}}>
          <Text>发在</Text>
          <Text style={{color:"grey"}}>感情</Text>
          </View>
        </View>
        <View style={{ flexDirection:"row", marginTop:40, marginBottom:20, }}><Text style={{lineHeight:26, fontSize: 16,}}>{item.txt}</Text></View>
        <View style={{ flexDirection:"row"}}><Text style={{color:"grey"}}>{moment(item.date).locale("zh-cn").startOf('hour').fromNow()}</Text></View>


      </View>
    )
  };
  _keyExtractor = (item, index) => item.key;
  render() {
    return (
      <View>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={clippingsStore.loading}
              onRefresh={()=>clippingsStore.getFreshSecrets(1498734378680)}
            />
          }

          keyExtractor={this._keyExtractor}
          data={clippingsStore.secrets.slice()}
          renderItem={({item, index}) => this._renderRow(item, index)}
        />
      </View>
    );
  }
}

SecretsScreen.propTypes = {};
SecretsScreen.defaultProps = {};

export default SecretsScreen;
