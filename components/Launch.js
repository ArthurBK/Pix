import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import CookieManager from 'react-native-cookies';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <View {...this.props} style={styles.container}>

      <View  style={styles.topContainer}>
        <Image
           source={require('./img/Logo_blue.png')}
           style={styles.thumbnail}/>
           </View>
        <View style={styles.lowerContainer}>
        <View style={styles.loginButton}>
        <Button onPress={()=>Actions.login({data:"Custom data", title:"Custom title" })} style={styles.loginTextButton}><Icon name="instagram" size={35} color='white'/> Se connecter avec Instagram</Button>
        </View>
        </View>


    


      </View>
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
  },
  lowerContainer: {
    flex:1,
    justifyContent: "center",
  },
  loginTextButton: {
    color:'white',
    fontSize: 20
  },
  thumbnail: {
    marginTop: 60,
    width: width/3,
    height: height*(3/8),
    resizeMode: 'contain'
    // backgroundColor: "#E2E2E2",
  }
});
