import React, { Component } from 'react';
import {  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob'
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; 

import {connect} from 'react-redux'

const base_url = require('../../../BASE_URL/BASE_URL')

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen:this.props.navigation.getParam('screen'),
      recording:false,
      processing:false,
      timer: this.props.dataQuestion[this.props.navigation.getParam('screen')].timer * 60 
    };
  }

  startTimer = () => {
    this.clockCall = setInterval(() => {
     this.decrementClock();
    }, 1000);
   }
   
   decrementClock = () => {  
    if(this.state.timer === 0) clearInterval(this.clockCall)
    this.setState((prevstate) => ({ timer: prevstate.timer-1 }));
   };
   
   componentWillUnmount() {
    clearInterval(this.clockCall);
   }

  //  _saveAnswer(id){
  //   const datauser = {"question_id":this.props.dataQuestion[id].id,"user_id":this.props.dataUser[0].id,"answer":null,"attachment":this.state.attachment}
  //   this.props.dispatch({type:'SaveAnswer',payload:datauser})
  // }
  _nextButton(){
    if(this.props.indexQuestion.includes(this.state.screen+1)){
      return(
          this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Question',params:{screen:this.state.screen+1} })]
          })
        )
      )
    }else{
      return(
        this.props.navigation.replace('EndScreen')
      )
    }
  }
  render() {
    const { recording, processing } = this.state;
    let button = (
      <TouchableOpacity
        onPress={()=> {this.startRecording(),this.startTimer()}}
        style={styles.capture}
      >
        <Text style={{ fontSize: 14 }}> RECORD </Text>
      </TouchableOpacity>
    );

    if (recording) {
      button = (
        <TouchableOpacity
          onPress={()=> {this.stopRecording()}}
          style={styles.capture}
        >
          <Text style={{ fontSize: 14 }}>  {this.state.timer === 0 ? this.stopRecording() : this.state.timer } </Text>
        </TouchableOpacity>
      );
    }

    if (processing) {
      button = (
        <View style={styles.capture}>
          <ActivityIndicator animating size={18} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
        />
        <View
          style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
        >
          
          {button}
        </View>
      </View>
    );
  }
   async startRecording() {
    this.setState({ recording: true });
    // default to mp4 for android as codec is not set
    const { uri, codec = "mp4" } = await this.camera.recordAsync();
    this.setState({ recording: false, processing: true });
    const type = `video/${codec}`;

    const data = new FormData();
    data.append("video", {
      name: "mobile-video-upload",
      type,
      uri
    });
    this.setState({
      attachment:data
    })

    try {
      AsyncStorage.getItem("token").then((value) => {
        RNFetchBlob.fetch('POST', `${base_url.BASE_URL}answer`, {
      // dropbox upload headers
        Authorization : `Bearer ${value}`,
      }, [
        { name: 'attachment', filename: 'vid.mp4', data: RNFetchBlob.wrap(uri) },
        { name: 'question_id', data: `${this.props.dataQuestion[this.state.screen].id}` },
        { name: 'user_id', data: `${this.props.dataUser[0].id}` },
    ])
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err.response)
        // error handling ..
      })
      })
      console.log(data)
    } catch (e) {
      console.error(e);
    }

    this.setState({ processing: false });
  }

  stopRecording() {
    this.camera.stopRecording();
    // this._saveAnswer(this.state.screen)
    this._nextButton()
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  }
});


const mapStatetoprops = state =>({
  dataUser:state.dataUser,
  dataQuestion:state.dataQuestion,
  indexQuestion:state.indexQuestion
  
})
export default connect(mapStatetoprops)(Video);

