import React, { Component } from 'react'
import {StatusBar,View,Text,TextInput,Alert,TouchableOpacity,TouchableWithoutFeedback,Dimensions,Image} from 'react-native'
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
import {Icon} from  'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import LinearGradient from 'react-native-linear-gradient'
import styles from './styles'
import axios from 'axios'
import {connect} from 'react-redux'

const base_url = require('../../../BASE_URL/BASE_URL')

var {width,height}=Dimensions.get('window')

class FormUser extends Component {

    constructor(){
        super()
        this.state={
            email:'',
            username:'',
            password:'',
            phone:'',
            passwordInvisible: true,
            isEmailValid:true,
            isUsernameValid:true,
            isPasswordValid:true,
        }
    }

    async _handlingRegister() {
        try {
          const response = await axios.post(`${base_url.BASE_URL}user`,{
              email:this.state.email,
              password:this.state.password,
              name:this.state.username,
              phone_number:this.state.phone
          });
          if(response.status == 200){
            // console.log(response.data.data[0].email)
            // console.log(response.data.data[0].id)
            // console.log(response.data.data[0].username)
            // console.log(response.data.token.token)
            // AsyncStorage.multiSet([['id', response.data.data[0].id], ['email', response.data.data[0].email],['username',response.data.data[0].username],['token',response.data.token.token]]);
            // AsyncStorage.setItem('token',response.data.token)
            const id = response.data.data[0].id
            const email = response.data.data[0].email
            const username = response.data.data[0].name
            const phone = response.data.data[0].phone_number
            const token = response.data.token.token
            const datauser = {"id":id,"email":email,"username":username,"phone_number":phone}
            AsyncStorage.setItem('token',token)
            this.props.dispatch({type:'Register',payload:datauser})
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'Home' })
                ],
              }))
          }
        } catch (error) {
            console.log(error.response)
            if(error.response.data.some(data=>data.field=="email")){
                this.setState({isEmailValid:false})
            }else{
                this.setState({isEmailValid:true})
            }

            if(error.response.data.some(data=>data.field=="username")){
                this.setState({isUsernameValid:false})
            }else{
                this.setState({isUsernameValid:true})
            }

            if(error.response.data.some(data=>data.field=="password")){
                this.setState({isPasswordValid:false})
            }else{
                this.setState({isPasswordValid:true})
            }
        }
    }

    render() {
        return (
            <LinearGradient
                start={{x: 1.5, y: 0.3}}
                end={{x: 0.5, y: 1.4}}
                colors={[
                    "#E4E5E6","#ECE9E6","#ECE9E6","#E4E5E6"
                ]}
                style={styles.container} >
                <View style={styles.content} >
                    <StatusBar backgroundColor='#6fbce5' barStyle='dark-content'/>
                    <View style={styles.contentItem} >
                        <Image
                            style={styles.image}
                            source={{uri:'https://images.vexels.com/media/users/3/152299/isolated/preview/4f63af6a16633f2bfd29063205f2882c-astronaut-flying-cartoon-by-vexels.png'}}/>
                        <Text style={styles.text1} >
                            ASTRONOT CLONE
                        </Text>
                    </View>
                    <View style={styles.content2} >
                        <View style={styles.contentItem4} >
                            <Text style={styles.text4} >
                                REGISTER
                            </Text>
                        </View>
                        <View style={styles.contentItem2} >
                            <View style={(this.state.isEmailValid===false) ? [styles.inputBox,{borderColor:'red',borderWidth:1}] : styles.inputBox} >
                            <TextInput
                                style={styles.inputText}
                                placeholder='Email'
                                placeholderTextColor= '#D9EDF0' onChangeText={(email) => {this.setState({email})}} />
                            </View>
                            <View style={(this.state.isUsernameValid===false) ? [styles.inputBox,{borderColor:'red',borderWidth:1}] : styles.inputBox} >
                            <TextInput
                                style={styles.inputText}
                                placeholder='Username'
                                placeholderTextColor= '#D9EDF0' onChangeText={(username) =>{this.setState({username})}} />
                            </View>
                            <View style={styles.inputBox} >
                            <TextInput
                                style={styles.inputText}
                                placeholder='Phone'
                                placeholderTextColor= '#D9EDF0' onChangeText={(phone) =>{this.setState({phone})}} />
                            </View>
                            <View style={(this.state.isPasswordValid===false) ? [styles.inputBox,{borderColor:'red',borderWidth:1}] : styles.inputBox} >
                                <TextInput
                                    style={styles.inputText2}
                                    secureTextEntry= {this.state.passwordInvisible}
                                    placeholder='Password'
                                    placeholderTextColor= '#D9EDF0' onChangeText={(password) =>{this.setState({password})}} />
                                <TouchableOpacity
                                    style={styles.iconBox}
                                    onPress={() => this.setState({passwordInvisible: !this.state.passwordInvisible})}
                                >
                                    <Icon
                                        name={this.state.passwordInvisible === true ? 'eye-with-line': 'eye'}
                                        type='Entypo' style={styles.iconItem} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={ () => this._handlingRegister() }
                                style={styles.inputBox2}>
                                <Text style={styles.iconItem2} >
                                    REGISTER NOW
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        )
    }
}
const mapStatetoprops = state =>({

    
})
export default connect(mapStatetoprops)(FormUser);
