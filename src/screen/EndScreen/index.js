import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {Image,Dimensions} from 'react-native'
export default class AnatomyExample extends Component {
  render() {
    return (
      <Container style={{padding:10}}>
        <Content style={{flex:1,width:"100%",height:"100%"}}>
          <Image style={{width:400, height:350}} source={{uri:'https://i.ibb.co/V23Wcf5/congratulations.jpg'}}/>
          <Text style={{
             fontSize: 20,
             fontFamily: 'sans-serif-condensed',
             fontWeight: 'bold'
          }}>Terimakasih telah menjawab, Kami akan segera menghubungi Anda.</Text>
        </Content>
      </Container>
    );
  }
}