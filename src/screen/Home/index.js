import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Text,
  FlatList,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Image
} from 'react-native';
import {connect} from 'react-redux'

import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions
} from 'react-navigation';
import { Icon, Thumbnail } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
//import {storageData} from '../../utils'

const Global = require('../../../BASE_URL/BASE_URL')
const url = Global.BASE_URL;

var { width, height } = Dimensions.get('window');

class Home extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: [],
      crosswordList: [],
      passwordInvisible: true
    };
  }

  fetchUser = async token => {
    let options = { headers: { Authorization: `Bearer ${token}` } };
    let result = await Axios.get(`${url}question`, options);
    // console.log(result.data.data)
    this.props.dispatch({type:'GetDataQuestion',payload:result.data.data})
    this.setState({ user: result.data.data });
    console.log(this.props.indexQuestion)

  };

//   fetchList = async token => {
//     let options = { headers: { Authorization: `Bearer ${token}` } };
//     let result = await Axios.get(`${url}crosswords`, options);
//     this.setState({ crosswordList: result.data.data });
//   };

  componentDidMount() {
    // this._isMounted = true;
    AsyncStorage.getItem('token', (err, res) => {
      if (res) {
        this.fetchUser(res);
      }
    });

  }

  componentWillUnmount() {
    // this._isMounted = false;
  }

  handleLogout() {
    Alert.alert(
      '',
      'Are you sure you want to logout? ',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => {
            AsyncStorage.removeItem('token');
            this.props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Auth' })]
              })
            );
          }
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          start={{ x: 1.5, y: 0.3 }}
          end={{ x: 0.5, y: 1.4 }}
          colors={[
            '#f8d153',
            '#f8d463',
            '#f8d671',
            '#ddd975',
            '#a9db8b',
            '#65d6a7',
            '#00cdc9',
            '#00bee4',
            '#30abed'
          ]}
          style={{ height: 475 }}
        >
          <View>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={styles.header}>
              <View style={styles.headerBox}>
                <Image
                  style={styles.image}
                  source={{uri:'https://images.vexels.com/media/users/3/152299/isolated/preview/4f63af6a16633f2bfd29063205f2882c-astronaut-flying-cartoon-by-vexels.png'}}
                />
                <Text style={styles.text1}>ASTRONAUT</Text>
              </View>
              <TouchableOpacity onPress={() => this.handleLogout()} style={styles.headerButton}>
                <Icon name="logout" type="AntDesign" style={styles.headerButtonIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.content}>
              <View style={styles.avatarBox}>
                <Thumbnail
                  style={styles.avatar}
                  source={{uri:'https://images.vexels.com/media/users/3/152299/isolated/preview/4f63af6a16633f2bfd29063205f2882c-astronaut-flying-cartoon-by-vexels.png'}}
                />
              </View>
              <View style={styles.usernameBox}>
                <View style={styles.usernameitem1}>
                  <Text style={styles.usernameText1}>{this.props.dataUser[0].username}</Text>
                </View>
                <View style={styles.usernameitem2}>
                  <Text style={styles.usernameText2}>{this.props.dataUser[0].email}</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.menuBox}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuHeaderText}>Detail</Text>
          </View>
          <View style={styles.menuItem}>
              {/* <Text>PT MENCARI CINTA SEJATI</Text>
              <Text>- RECORD VIDEO</Text>
              <Text>- PILIH JAWABAN</Text>
              <Text>- TULIS JAWABAN</Text>
              <Text>JUMLAH PERTANYAAN : 3</Text> */}
              <TouchableOpacity onPress={()=>{this.props.navigation.replace('Question',{screen:this.props.indexQuestion[0]})}}><Text>Jawab Pertanyaan</Text></TouchableOpacity>

          </View>
        </View>
      </View>
    );
  }
}

const mapStatetoprops = state =>({
    dataUser:state.dataUser,
    dataQuestion:state.dataQuestion,
    indexQuestion:state.indexQuestion
    
})
export default connect(mapStatetoprops)(Home);

