import { createAppContainer, createStackNavigator} from 'react-navigation';
import React, { Component } from 'react'
import FormUser from './src/screen/FormUser'
import Home from './src/screen/Home'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import Question from './src/screen/Questions'
import EndScreen from './src/screen/EndScreen'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
const base_url = require('./BASE_URL/BASE_URL')

const FormUsers = createStackNavigator({

  FormUsers: {
    screen: FormUser,
  }

}, {
    initialRouteName: 'FormUsers',
    defaultNavigationOptions:{header:null}
  }
);
// const Dashboard = createStackNavigator({


// }, {
//     initialRouteName: 'Home',
//     defaultNavigationOptions:{header:null}
//   }
// );

const RootNavigator = createStackNavigator(
  {
    Load: FormUsers,
    Home: {
      screen: Home,
    },
    Question: {
      screen: Question,
    },
    EndScreen: {
      screen: EndScreen,
    },
  },
  {
    initialRouteName: 'Load',
    defaultNavigationOptions:{header:null}
  }
);

const initialState = {
  dataUser:[],
  dataQuestion:[],
  indexQuestion:[],
  dataAnswer:[]
}
const reducer = (state=initialState,action)=>{
  // console.log(action)
  if (action.type == 'Register'){
    state.dataUser.push(action.payload);
  }else if(action.type == 'GetDataQuestion'){
    state.dataQuestion = action.payload
    state.dataQuestion.map((data,index)=>{
      state.indexQuestion.push(index)
    })
  }else if(action.type == 'SaveAnswer'){
    state.dataAnswer.push(action.payload);
    AsyncStorage.getItem("token").then((value) => {
      axios({
        method: 'post',
        url: `${base_url.BASE_URL}answer`,
        headers:{Authorization:`Bearer ${value}`},
        data: {
          question_id: state.dataAnswer[0].question_id,
          user_id: state.dataAnswer[0].user_id,
          answer: state.dataAnswer[0].answer,
          attachment: state.dataAnswer[0].attachment,
        }
      });
  })
    console.log(state.dataQuestion)
  }
  // console.log(state.dataAnswer)
  console.log(state.dataQuestion)
return state;
}

const store = createStore(reducer);
const ShowScreen = createAppContainer(RootNavigator);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ShowScreen/>
      </Provider>
    );
  }
}

export default App
