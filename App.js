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
import Video from './src/screen/Questions/Video'
import RNFetchBlob from 'react-native-fetch-blob'
import DesignHome from './src/screen/Home/designHome'
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
    Video: {
      screen: Video,
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
      // RNFetchBlob.fetch('POST', `${base_url.BASE_URL}answer`, {
      //   // dropbox upload headers
      //     Authorization : `Bearer ${value}`,
      //   }, dataPost)
      //   .then((res) => {
      //     for( var i = 0; i < state.dataAnswer.length; i++){ 
      //       state.dataAnswer.splice(i, 1); 
      //     }
      //     console.log(state.dataAnswer);
      //   })
      //   .catch((err) => {
      //     console.log(err.response)
      //     // error handling ..
      //   })
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
      }).then(function (response) {
        for( var i = 0; i < state.dataAnswer.length; i++){ 
          state.dataAnswer.splice(i, 1); 
        }
        console.log(state.dataAnswer);
      });
    })
  }else if(action.type == 'SaveVideo'){
    state.dataAnswer.push(action.payload);
    AsyncStorage.getItem("token").then((value) => {
      RNFetchBlob.fetch('POST', `${base_url.BASE_URL}answer`, {
        // dropbox upload headers
          Authorization : `Bearer ${value}`,
        }, 
        { name: 'attachment', filename: 'vid.mp4', data: RNFetchBlob.wrap(JSON.stringify(state.dataAnswer[0].attachment)) },)
        .then((res) => {
          for( var i = 0; i < state.dataAnswer.length; i++){ 
            state.dataAnswer.splice(i, 1); 
          }
          console.log(state.dataAnswer);
        })
        .catch((err) => {
          console.log(err.response)
          // error handling ..
        })
      // axios({
      //   method: 'post',
      //   url: `${base_url.BASE_URL}answer`,
      //   headers:{Authorization:`Bearer ${value}`},
      //   data: {
      //     question_id: state.dataAnswer[0].question_id,
      //     user_id: state.dataAnswer[0].user_id,
      //     answer: state.dataAnswer[0].answer,
      //     attachment: state.dataAnswer[0].attachment,
      //   }
      // }).then(function (response) {
      //   for( var i = 0; i < state.dataAnswer.length; i++){ 
      //     state.dataAnswer.splice(i, 1); 
      //   }
      //   console.log(state.dataAnswer);
      // });
    })
  }
  // console.log(state.dataAnswer)
  console.log(state.dataAnswer)
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
