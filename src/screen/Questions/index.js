import React, { Component } from 'react';
import { View, Text ,TouchableOpacity,TextInput} from 'react-native';
import CountDown from 'react-native-countdown-component';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; 
import {connect} from 'react-redux'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import MultiSelect from 'react-native-multiple-select';
import {Container, Header, Left, Body, Right, Button, Icon, Title,Input,Item} from 'native-base'
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
        screen:this.props.navigation.getParam('screen'),
        attachment:'',
        dataRadio:[],
        selectedItems:[],
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
    console.log(dataku)
    return dataku
}
dataMultiSelect(id){
    const dataku=[]
    const str = this.props.dataQuestion[id].options;
    const res = str.split(",");
    res.map((data,index)=>{
      dataku.splice(1, 0, {"id":`${index}`,"name":data});
        // this.state.dataRadio.push({"label":data,"value":index})
    })
    console.log(dataku)
    return dataku
}

  _saveAnswer(id){
    const datauser = {"question_id":this.props.dataQuestion[id].id,"user_id":this.props.dataUser[0].id,"answer":this.state.answer,"attachment":null}
    this.props.dispatch({type:'SaveAnswer',payload:datauser})
  }
  _nextButton(){
    if(this.props.dataQuestion[this.state.screen].type == 'video record'){
      return(
        this.props.navigation.navigate('Video',{screen:this.state.screen})
      )
    }else{
      if(this.props.indexQuestion.includes(this.state.screen+1)){
        return(
          this._saveAnswer(this.state.screen),this.props.navigation.dispatch(
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
  }
  _question(id){
    if(this.props.dataQuestion[id].type == 'text'){
        return(
          <Item regular style={{borderRadius:10}}>
              <Input onChangeText={(answer)=>{this.setState({answer})}} multiline = {true} numberOfLines = {4} />
          </Item>
        )
    }else if(this.props.dataQuestion[id].type == 'multiple choice'){
        console.log(this.state.value)
        return(
            <View>
            <RadioForm
              radio_props={this.dataRadioButton(this.state.screen)}
              initial={this.dataRadioButton(this.state.screen)}
              onPress={(answer) => {console.log(this.state.answer),this.setState({answer})}}
            />
            </View>
        )
    }else if(this.props.dataQuestion[id].type == 'multi select'){
      return(
        <View>
        <MultiSelect
          hideTags
          items={this.dataMultiSelect(this.state.screen)}
          uniqueKey="id"
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          selectText="Pick Items"
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          submitButtonColor="#CCC"
          submitButtonText="Pilih"
        />
     
        </View>
      )
    }
  }
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems,answer:selectedItems.toString()});
    console.log(this.state.answer)
  };

  Timer(){
    if (this.props.dataQuestion[this.state.screen].type !== 'video record'){
      return(
        <CountDown
        size={20}
        until={this.props.dataQuestion[this.state.screen].timer * 60}
        onFinish={() => this._nextButton()}
        digitStyle={{backgroundColor: '#FFF'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#1CC625'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      />
      )
    }
  }
  render() {
    return (
      <Container>
            <Header style={{backgroundColor:'white'}}>
              <Right>
              {this.Timer()}
              </Right>
            </Header>
            <View>
                <View style={{margin:15}}>
                    <Text style={{fontWeight:'bold',fontSize:20}}>{this.props.dataQuestion[this.state.screen].descriptions}</Text>
                </View>
                <View>
                {this._question(this.state.screen)}
                </View>
                <View style={{margin:20}}>
                        <Button success iconRight onPress={()=>{this._nextButton()}}>
                            <Text style={{margin:5,color:'white'}}>NEXT</Text>
                            <Icon name='arrow-forward' />
                        </Button>
                </View>
            </View>
          </Container>
    );
  }
}

const mapStatetoprops = state =>({
    dataUser:state.dataUser,
    dataQuestion:state.dataQuestion,
    indexQuestion:state.indexQuestion
    
})
export default connect(mapStatetoprops)(Question);


