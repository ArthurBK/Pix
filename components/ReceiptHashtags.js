import React, { PropTypes, Component } from 'react';
var ReactNative = require('react-native');
var {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
  PanResponder,
  Clipboard,
Animated
} = ReactNative;

import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import Emoji from "react-native-emoji";

var { width, height } = Dimensions.get('window');


export default class extends  Component {

  constructor(props) {
    super(props);
    this.state = {
myButtonOpacity: new Animated.Value(0),
    };
  }




  postapplication() {
    // name = this.props.campaign.name
    fetch('http://picreward.herokuapp.com/api/v1/applications', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-User-Email": "arthurbonnecarrere@example.com",
        "X-User-Token": "y4msWpSRPovE4hxH83tZ",
      },
      body: JSON.stringify(
        { application:
          { campaign_id: this.props.campaign.id,
            status: 'Confirmed',
            motivation: 'need to check validation ActiveREcords'
          }
        })

      })

    }
    //
    componentWillUnmount() {
      clearTimeout(this.timer);
    }

    async _setClipboardContent(){
      Animated.timing(  // Uses easing functions
      this.state.myButtonOpacity,  // The value to drive
      {toValue: 1}  // Configuration
      ).start();

// this.setState({myButtonOpacity: 0})

  Clipboard.setString("@weflash_app, @" + this.props.campaign.iger_account);


  this.timer = setTimeout(() => {
    Animated.timing(  // Uses easing functions
    this.state.myButtonOpacity,  // The value to drive
    {toValue: 0}  // Configuration
    ).start();
  }, 3000);



  // try { var content = await Clipboard.getString();
      //   this.setState({content});
      // } catch (e) {
      //   this.setState({content:e.message});
      // }
    }



    render() {
      return (

        <View
          style={styles.container}>
          <View
            style={styles.touchContainer}>
            <Image
              source={{uri: this.props.campaign.photo.photo.url}}
              style={styles.thumbnail}>
              <View>
                <View style={styles.boxImageView}>
                  <View>
                    <Text style={styles.boxImageHeaderText}>
                      POSTE UNE PHOTO
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.boxImageText}>
                      pour swapper à nouveau
                    </Text>
                  </View>
                </View>
              </View>

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
                      Copiés
                    </Text>
                  </View>
                </Animated.View>
              </View>




            </Image>
            <View>
              <View style={{paddingLeft: 20}}>
                <View>
                  <Text style={styles.productText}>
                    {this.props.campaign.product}
                  </Text>
                </View>
                <View>
                  <Text style={styles.titleText}>
                    {this.props.campaign.title}
                  </Text>
                </View>
              </View>
              <View style={styles.inlineContainer}>
                <View style={{paddingLeft:20, width: width/2}}>
                <Text style={styles.descriptionTextBold}>
                  Hashtags:
                </Text>
                <Text style={styles.descriptionText}>
                  @weflash_app, @{this.props.campaign.iger_account}
                </Text>
                </View>
                <View style={{width: width/2, paddingRight:20}}>
                <Text style={styles.descriptionTextBold}>
                </Text>

                </View>
              </View>
            </View>
          </View>
          <View style={styles.lowerContainer}>

            <View></View>
            <View>
              <Button style={styles.profileButton}
                >
                <TouchableHighlight
                  onPress={this._setClipboardContent.bind(this)}
                  style={styles.buttonHighlight}
                  >
                  <Text style={styles.buttonText}>Copier les Hashtags #</Text>
                </TouchableHighlight>
              </Button>
            </View>
          </View>
        </View>


      );
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: "yellow",
    },
    lowerContainer: {
      flex: 1,
      justifyContent: 'space-between',
      marginBottom: 20,
      // backgroundColor:'green'
    },
    buttonText: {
      textAlign:'center',
      height: 50,
      padding: 16,
      backgroundColor: '#2980B9',
      fontSize: 18,
      width: width - 20,
      color: "white",
      borderRadius: 5,
    },
    buttonHighlight: {
      height: 50,
      width: width - 20,
      marginHorizontal:10,
      borderRadius: 5,
    },
    thumbnail: {
      width: width,
      height: height/2,
      backgroundColor: "#E2E2E2",
    },
    boxImageView: {
      width: width*(2/3),
      height: height/10,
      marginLeft: width/6,
      marginTop: width/3,
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#2980B9',
      opacity: 0.8,
      borderRadius: 10

    },
    boxImageHeaderText: {
      fontWeight: '400',
      fontSize: 20,
      color: 'white',
    },
    boxImageText: {
      color: 'white'
    },
    messageImageView: {
      width: width*(1/3),
      height: height/10,
      marginLeft: width/3,
      marginTop: width/10,
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
    titleText: {
      fontFamily: 'PingFang TC',
      fontWeight: '900',
      fontSize: 20,
      color: '#606060',
    },
    productText: {
      fontFamily: 'PingFang TC',
      fontSize: 30,
      color: '#2980B9',
    },
    descriptionText: {
      fontFamily: 'PingFang TC',
      fontSize: 16,
      color: '#606060',
    },
    descriptionTextBold: {
      fontFamily: 'PingFang TC',
      fontSize: 16,
      fontWeight: '800',
      color: '#606060',
    },
    inlineContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // backgroundColor: 'yellow',
      marginTop: 20
    },
    touchContainer: {
      // backgroundColor: 'red',
      height: height*(88/100)
    },
  });
