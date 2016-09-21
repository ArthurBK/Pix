import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Animated, Alert } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import Emoji from "react-native-emoji";

var REQUEST_URL = 'http://www.weflash.io/api/v1/influencers/';

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      emailCheck: '',
      username: '',
      myButtonOpacity: new Animated.Value(0),
    };
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };



  componentWillUnmount() {
    clearTimeout(this.timer);
  }


  async _updateProfileInfo(){
    // Animated.timing(  // Uses easing functions
    //   this.state.myButtonOpacity,  // The value to drive
    //   {toValue: 1}  // Configuration
    // ).start();
    //
    // // this.setState({myButtonOpacity: 0})
    // // Clipboard.setString(this.props.campaign.title);
    //
    //
    // this.timer = setTimeout(() => {
    //   Animated.timing(  // Uses easing functions
    //     this.state.myButtonOpacity,  // The value to drive
    //     {toValue: 0}  // Configuration
    //   ).start();
    // }, 3000);
    //



    if (!this.validateEmail(this.state.text)) {
      Alert.alert( '\u2709 Oups! Email non valide \u2709',
      '',
      [ {text: 'Got it!'},])
      // not a valid email
    } else {
        fetch('http://www.weflash.io/api/v1/users', {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            { user:
              { email: this.state.text,
              }
            })
          })
        Actions.tabbar();

      }
      }


        render () {
          if (true) {
          return(
            <View style={styles.mainContainer}>
            <View style={styles.container}>
            <View>
            <Animated.View
            style={[styles.messageImageView, {opacity: this.state.myButtonOpacity}]}
            >
            <View>
            <Text style={styles.messageImageHeaderText}>
            <Emoji name="heavy_check_mark"/>
            </Text>
            </View>
            <View>
            <Text style={styles.messageImageText}>
            Mis à jour
            </Text>
            </View>
            </Animated.View>
            </View>
            <Text style={styles.textInfo}>Email</Text>
            <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />

            <Button
            style={styles.updateButton}
            onPress={this._updateProfileInfo.bind(this)}>Confirmer</Button>
            </View>
            </View>
          )};
}
        }

        var { width, height } = Dimensions.get('window');

        // var {
        //   height: deviceHeight,
        //   width: deviceWidth
        // } = Dimensions.get("window");

        const styles = StyleSheet.create({
          container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#2980B9',
          },
          buttonContainer: {
            flex: 1,
            justifyContent: 'flex-start'
          },
          mainContainer: {
            flex: 1,
            backgroundColor: '#2980B9',
          },
          textInput: {
            height: height/15,
            width: width/2,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 10,
            alignSelf: 'center',
            color: '#001929',
            paddingLeft: 10
          },
          updateButton: {
            color: 'white',
            marginTop: 20,
            borderWidth: 2,
            borderColor: 'white',
            padding: 16,
            borderRadius: 25

          },
          backButton: {
            color: 'white',
            marginTop: 20,
            // fontSize: 40,
            borderWidth: 2,
            borderColor: 'white',
            padding: 16,
            borderRadius: 25
            // fontWdsd:2,
            // borderWidth: 2,
            // borderColor: 'white',
            // padding: 16,
            // borderRadius: 25

          },
          textInfo: {
            fontSize: 26,
            color: 'white',
            marginBottom: 20,
            marginTop: 20
          },
          messageImageView: {
            width: width*(1/3),
            height: height/10,
            // marginLeft: width/3,
            // marginBottom: 80,
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'white',
            opacity: 1,
            borderRadius: 10
          },
          messageImageHeaderText: {
            fontWeight: '400',
            fontSize: 20,
            color: 'black'
          },
          messageImageText: {
            color: 'black'
          },
        });
