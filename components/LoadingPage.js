import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, Image, ActivityIndicator} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
var { width, height } = Dimensions.get('window');


class Launch extends  Component {

  render(){
    return (
      <View style={styles.container}>

      <ActivityIndicator color='#2980B9' size='large' />

      </View>
    );
  }
}

module.exports = Launch;


const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    // borderWidth: 2,
    // borderColor: 'red',
  },

});
