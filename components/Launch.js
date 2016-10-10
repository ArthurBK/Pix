import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, Image, Linking} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import CookieManager from 'react-native-cookies';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper'


var { width, height } = Dimensions.get('window');










class Launch extends  Component {

  //
  // logout () {
  //     CookieManager.clearAll((err, res) => {
  //       console.log(err);
  //       console.log(res);
  //     });
  //
  //     // this.setState({
  //     //   loggedIn: false,
  //     // });
  //   }

  render(){
    return (
      <Swiper
        style={styles.wrapper}
        dot={<View style={styles.dots} />}
        activeDot={<View style={styles.activeDots} />}
        // showsButtons={true}
        {...this.props} >
      <View style={styles.slideContainer}>
      <Image
         source={require('./img/Inscription.png')}
         style={styles.fullScreenImage}/>
      </View>
        <View style={styles.slideContainer}>
        <Image
           source={require('./img/List.png')}
           style={styles.fullScreenImage}/>
        </View>
        <View style={styles.slideContainer}>
        <Image
           source={require('./img/Confirmation.png')}
           style={styles.fullScreenImage}/>
        </View>
        <View style={styles.slideContainer}>
        <Image
           source={require('./img/IgerProcess.png')}
           style={styles.fullScreenImage}/>
        </View>
        <View style={styles.container}>
        <View  style={styles.topContainer}>
          <Image
             source={require('./img/Logo_w_border.png')}
             style={styles.thumbnail}/>
             </View>
          <View style={styles.lowerContainer}>
          <View style={styles.loginButton}>
          <Button
          onPress={()=>Actions.login({data:"Custom data", title:"Custom title" })}
          style={styles.loginTextButton}>
          <Icon name="instagram" size={35} color='white'/>
          Se connecter avec Instagram
          </Button>
          </View>
          <Button
          onPress={()=>Actions.tabbar2()}
          style={styles.loginText}>
          Regarder les offres
          </Button>
          </View>
        </View>

      </Swiper>

    );
  }
}


module.exports = Launch;


const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    // borderWidth: 2,
    // borderColor: 'red',
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    // borderWidth: 2,
    // borderColor: 'red',
  },
  loginButton: {
    // flex: 1,
    backgroundColor: '#2980B9',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    // width: width - 40
  },
  lowerContainer: {
    flex:1,
    justifyContent: "center",
  },
  loginTextButton: {
    color:'white',
    fontSize: 18,
    paddingLeft: 20
  },
  loginText: {
    marginTop: 10,
    color:'#2980B9',
    fontSize: 18,
    paddingLeft: 20,
    // borderColor: '#2980B9',
    // borderWidth: 2,
    // borderRadius: 10
  },
  thumbnail: {
    marginTop: 60,
    width: width/2,
    height: height*(3/8),
    resizeMode: 'contain',
  },
fullScreenImage:{
  width: width,
  height: height
},
    wrapper: {
    },
    slideContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    },
    dots: {
      backgroundColor:'rgba(0,0,0,.2)',
      width: 10,
      height: 10,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: height/8,},
    activeDots: {
      backgroundColor:'#2980B9',
      width: 10,
      height: 10,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: height/8,}

});
