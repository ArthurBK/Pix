import React, { PropTypes, Component } from 'react';
var ReactNative = require('react-native');
var TimerMixin = require('react-timer-mixin');
var {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  PanResponder,
  Navigator,
  TouchableHighlight,
  Alert
} = ReactNative;
import * as Animatable from 'react-native-animatable';
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import Emoji from "react-native-emoji";
// @makePannable


// Navigator.SceneConfigs.FloatFromRight.gestures.pop.edgeHitWidth = 300

var { width, height } = Dimensions.get('window');




export default class extends  Component {
  constructor(props) {
    super(props);

  }
  mixins: [TimerMixin];
   componentDidMount() {

     this.timer = setTimeout(() => {
    Actions.pop();
    Actions.pop();
    Actions.pop();
    Actions.campaigns({loaded: false});
    Actions.receipts_path({loaded: false});
  }, 2000);

   }

   componentWillUnmount() {
     clearTimeout(this.timer);
   }

  render(){
    return (

      <Animatable.View
        style={styles.container}
        >
        <View>

          <Text style={styles.emoji}>
            <Emoji name="tropical_drink"/>
            <Text style={styles.textPage}>
              Enjoy
              <Text style={styles.emoji}>
                <Emoji name="tropical_drink"/>
              </Text>
            </Text>
          </Text>
        </View>
        <View>
          <Text style={styles.emoji}>
            <Emoji name="camera_with_flash"/>
          </Text>
        </View>
      </Animatable.View>


    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#2980B9",
  },

  textPage: {
    fontSize: 40,
    color: "white",
    fontFamily: 'PingFang TC',
    fontWeight: '900',

  },
  emoji: {
    fontSize: 70,
    color: "white",
    fontFamily: 'PingFang TC',
    fontWeight: '900',

  },

  // content: {
  //   flex: 1,
  //   borderBottomColor: "#8D8D8D",
  //   borderBottomWidth: 25,
  //   borderTopColor: "#8D8D8D",
  //   borderTopWidth: 25,
  //   marginBottom: 10,
  //   height: height/2,
  // },

  //     buttonText:{
  //       textAlign:'center',
  //       height: 50,
  //       padding: 16,
  //       backgroundColor: '#2980B9',
  //       fontSize: 18,
  //       width: width - 20,
  //       color: "white",
  //       borderRadius: 5,
  //
  //     },
  //     buttonHighlight:{
  //       height: 50,
  //       width: width - 20,
  //       marginHorizontal:10,
  //       borderRadius: 5,
  //
  //     },
  //
  //
  //     thumbnail: {
  //       width: Dimensions.get('window').width,
  //       height: Dimensions.get('window').height/2,
  //       backgroundColor: "#E2E2E2",
  //       transform: [{rotate: '180deg'}],
  //
  //
  //       // borderRadius: 5,
  //     },
  //     titleText: {
  //       paddingBottom: 30,
  //       textAlign: 'center',
  //       fontFamily: 'PingFang TC',
  //       fontWeight: '900',
  //       fontSize: 20,
  //       color: '#606060',
  //
  //     },
  //
  //     arrowText: {
  //       fontSize: 40,
  //       textAlign:'center',
  //
  //     },
  //     descriptionText: {
  //       fontFamily: 'PingFang TC',
  //       fontSize: 20,
  //       color: '#606060',
  //       textAlign:'center',
  //
  //     },
  //     clickButton:{
  //       marginBottom:50,
  //     },
  //     viewSeparator:{
  //       backgroundColor: 'transparent',
  //       borderTopWidth: 10,
  //       borderTopColor: '#2980B9',
  // paddingTop:30,
  //     },

});

// module.exports = default
