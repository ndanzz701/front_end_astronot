import React, { Component } from 'react';
import { View, Text ,TouchableOpacity,TextInput} from 'react-native';
import CountDown from 'react-native-countdown-component';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; 
import {connect} from 'react-redux'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
        screen:this.props.navigation.getParam('screen'),
        attachment:'',
        dataRadio:[],
        answer:'',
        answerRadio:0
    };
  }

dataRadioButton(id){
    const dataku=[]
    const str = this.props.dataQuestion[id].options;
    const res = str.split(",");
    res.map((data,index)=>{
      dataku.splice(1, 0, {"label":data,"value":index});
        // this.state.dataRadio.push({"label":data,"value":index})
    })
    return dataku
}

  _saveAnswer(id){
    const datauser = {"question_id":this.props.dataQuestion[id].id,"user_id":this.props.dataUser[0].id,"answer":this.state.answer,"attachment":this.state.attachment}
    this.props.dispatch({type:'SaveAnswer',payload:datauser})
  }
  _saveAnswerRadio(id){
    const datauser = {"question_id":this.props.dataQuestion[id].id,"user_id":this.props.dataUser[0].id,"answer":this.state.answerRadio,"attachment":this.state.attachment}
    this.props.dispatch({type:'SaveAnswer',payload:datauser})
  }
  _question(id){
    if(this.props.dataQuestion[id].type == 'text'){
        return(
            <View>
                <TextInput onChangeText={(answer)=>{this.setState({answer})}}/>
                {this.props.indexQuestion.includes(this.state.screen+1) ? <TouchableOpacity onPress={()=>{this._saveAnswer(this.state.screen),this.props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Question',params:{screen:this.state.screen+1} })]
              })
            )}}>
        <Text>{this.state.screen}</Text>
    </TouchableOpacity> : <TouchableOpacity onPress={()=>{this.props.navigation.replace('EndScreen')}}>
        <Text>{this.state.screen}</Text>
    </TouchableOpacity>}
            </View>
        )
    }else if(this.props.dataQuestion[id].type == 'multiple choice'){
        console.log(this.state.value)
        return(
            <View>
            <RadioForm
              radio_props={this.dataRadioButton(this.state.screen)}
              initial={0}
              onPress={(answerRadio) => {console.log(this.state.answerRadio),this.setState({answerRadio})}}
            />
            {this.props.indexQuestion.includes(this.state.screen+1) ? <TouchableOpacity onPress={()=>{this._saveAnswerRadio(this.state.screen),this.props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Question',params:{screen:this.state.screen+1} })]
              })
            )}}>
        <Text>{this.state.screen}</Text>
    </TouchableOpacity> : <TouchableOpacity onPress={()=>{this.props.navigation.replace('EndScreen')}}>
        <Text>{this.state.screen}</Text>
    </TouchableOpacity>}
            </View>
        )
    }
  }

  render() {
    return (
      <View>
               <CountDown
        size={30}
        until={this.props.dataQuestion[this.state.screen].timer * 60}
        onFinish={() => this._saveAnswer(this.state.screen)}
        digitStyle={{backgroundColor: '#FFF'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#1CC625'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      />
      <Text>{this.props.dataQuestion[this.state.screen].descriptions}</Text>
      {this._question(this.state.screen)}
    
      </View>
    );
  }
}

const mapStatetoprops = state =>({
    dataUser:state.dataUser,
    dataQuestion:state.dataQuestion,
    indexQuestion:state.indexQuestion
    
})
export default connect(mapStatetoprops)(Question);


