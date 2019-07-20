import React, { Component } from 'react'
import {StatusBar,View,Text,ScrollView,TextInput,Alert,TouchableOpacity,TouchableWithoutFeedback,Dimensions,Image} from 'react-native'
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
import {Container, Header, Left, Body, Right, Button, Icon, Title,Input,Item} from 'native-base'

import LinearGradient from 'react-native-linear-gradient'
import styles from './styles'


var {width,height}=Dimensions.get('window')

export default class Home extends Component {

    constructor(){
        super()
        this.state={
            passwordInvisible: true,
        }
    }

    render() {
        return (
            <Container>
            <Header>
              <Right>
              <Text>halo</Text>
              </Right>
            </Header>
            <View>
                <View style={{margin:15}}>
                    <Text style={{fontWeight:'bold',fontSize:20}}>deskripsi singkat tentang naon ajeng lah lieur aing keheddddd</Text>
                </View>
                <View>
                    <Item regular style={{borderRadius:10}}>
                        <Input  placeholder='Regular Textbox' multiline = {true} numberOfLines = {4} />
                    </Item>
                </View>
                <View style={{margin:20}}>
                        <Button success iconRight onPress={()=>{this.props.navigation.replace('Question',{screen:this.props.indexQuestion[0]})}}>
                            <Text style={{margin:5,color:'white'}}>NEXT</Text>
                            <Icon name='arrow-forward' />
                        </Button>
                </View>
            </View>
          </Container>
        )
    }
}