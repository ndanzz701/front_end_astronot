import React, { Component } from 'react';
import {  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View} from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios'
import RNFetchBlob from 'react-native-fetch-blob'
export default class test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording:false,
      processing:false
    };
  }

  render() {
    const { recording, processing } = this.state;

    let button = (
      <TouchableOpacity
        onPress={this.startRecording.bind(this)}
        style={styles.capture}
      >
        <Text style={{ fontSize: 14 }}> RECORD </Text>
      </TouchableOpacity>
    );

    if (recording) {
      button = (
        <TouchableOpacity
          onPress={this.stopRecording.bind(this)}
          style={styles.capture}
        >
          <Text style={{ fontSize: 14 }}> STOP </Text>
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
          type={RNCamera.Constants.Type.back}
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

    try {
      RNFetchBlob.fetch('POST', 'http://192.168.1.112:3333/api/v1/answer', {
    // dropbox upload headers
      Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjExOSwiaWF0IjoxNTYzMjU1MzcwfQ.bjtlap-AxtrmJrqOvi069_2qYZLDivHX1u__jYX6Ljs",
    }, [
      { name: 'attachment', filename: 'vid.mp4', data: RNFetchBlob.wrap(uri) },
      { name: 'question_id', data: '1' },
      { name: 'user_id', data: '1' },
      { name: 'answer', data: "halo gayyyss" },
  ])
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err.response)
      // error handling ..
    })
      console.log(data)
      // fetch("http://192.168.1.112:3333/api/v1/answer", {
      //   method: "POST",
      //   headers: new Headers({
      //     'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjExOSwiaWF0IjoxNTYzMjU1MzcwfQ.bjtlap-AxtrmJrqOvi069_2qYZLDivHX1u__jYX6Ljs`
      //   }), 
      //   body:{attachment:data}
      // })
      //   .then(response => response.json())
      //   .then(response => {
      //     console.log("upload succes", response);
      //     alert("Upload success!");
         
      //   })
      //   .catch(error => {
      //     console.log("upload error", error.response);
      //     alert("Upload failed!");
      //   });
      // axios({
      //   method: 'post',
      //   url: `http://192.168.1.112:3333/api/v1/answer`,
      //   headers:{
      //   'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjExOSwiaWF0IjoxNTYzMjU1MzcwfQ.bjtlap-AxtrmJrqOvi069_2qYZLDivHX1u__jYX6Ljs`,
      // },
      //   data: {
      //     question_id: 1,
      //     user_id: 1,
      //     answer: 'halo gays',
      //     attachment: data,
      //   }
      // }).then(function (response) {
      // console.log(response)
      // }).catch(function (error) {
      //   console.log(error.response);
      // });
      // const res = await fetch(ENDPOINT, {
      //   method: "post",
      //   body: data
      // });
    } catch (e) {
      console.error(e);
    }

    this.setState({ processing: false });
  }

  stopRecording() {
    this.camera.stopRecording();
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
