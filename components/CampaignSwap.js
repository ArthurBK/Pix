    import React, { PropTypes, Component } from 'react';
    var ReactNative = require('react-native');
    var {
      View,
      Text,
      StyleSheet,
      Image,
      Dimensions,
      PanResponder,
      Navigator,
      TouchableHighlight,
      Alert,
      ScrollView
    } = ReactNative;
    import * as Animatable from 'react-native-animatable';
    import Button from "react-native-button";
    import {Actions} from "react-native-router-flux";
    import Emoji from "react-native-emoji";
    // @makePannable


    // Navigator.SceneConfigs.FloatFromRight.gestures.pop.edgeHitWidth = 300

    var { width, height } = Dimensions.get('window');




    export default class extends  Component {

      constructor(props)
      {
        super(props);
      }

      postapplication()
      {
        // name = this.props.name
        fetch('http://localhost:3000/api/v1/applications',
        {
          method: 'POST',
          headers:
          {
            "Content-Type": "application/json",
            "X-User-Email": "arthurbonnecarrere@example.com",
            "Authorization": "y4msWpSRPovE4hxH83tZ",
          },
          body: JSON.stringify(
          { application:
            { campaign_id: this.props.id,
              status: 'Confirmed',
              motivation: 'need to check validation ActiveREcords'
            }
          })
        });
        Actions.campaign_swap_confirmation();
      }

      render()
      {
        return (
          <View style={styles.container}>
            <Image
              source={{uri: this.props.photo.photo.url}}
              style={styles.thumbnail}>
            <View style={styles.buttonContainer}>
              <View style={styles.viewSeparator}>
                  <Text style={styles.titleText}>
                    Bar Side
                  </Text>
              </View>
              <View style={styles.clickButton}>
                <Button>
                    <TouchableHighlight
                      onPress={this.postapplication.bind(this)}
                      style={styles.buttonHighlight}>
                      <Text style={styles.buttonText}>
                      Click Here
                      </Text>
                    </TouchableHighlight>
                  </Button>
                </View>
              </View>
            </Image>
            <View style={styles.lowerContainer}>
              <View>
                <View>
                  <Text style={{fontSize: 30, textAlign:'center'}}>
                    <Emoji name="point_up_2"/>
                  </Text>
                </View>
                <View>
                  <Text style={{fontSize: 40, textAlign:'center'}}>
                    <Emoji name="point_up_2"/>
                  </Text>
                </View>
                <View>
                  <Text style={{fontSize: 50, textAlign:'center'}}>
                    <Emoji name="point_up_2"/>
                  </Text>
                </View>
                <View >
                  <Text style={styles.descriptionText}>
                    Reach out phone to Bartender
                  </Text>
                </View>
              </View>
              <View>
                <Button >
                  <TouchableHighlight
                    onPress={Actions.pop}
                    style={styles.buttonHighlight}
                    >
                    <Text style={styles.buttonText}>CANCEL</Text>
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
        height: height
      },
      lowerContainer: {
        // backgroundColor:'green',
        flex:1,
        height:height/2,
        justifyContent:'space-between',
        paddingBottom:20
      },
      buttonContainer: {
        flex: 1,
        justifyContent: 'space-between',
        // marginBottom: 10,
        // backgroundColor: 'green'
      },
      buttonText:{
        textAlign:'center',
        height: 50,
        padding: 16,
        backgroundColor: '#2980B9',
        fontSize: 18,
        width: width - 20,
        color: "white",
        borderRadius: 5,

      },
      buttonHighlight:{
        height: 50,
        width: width - 20,
        marginHorizontal:10,
        borderRadius: 5,
      },
      thumbnail: {
        width: width,
        height: height/2,
        backgroundColor: "#E2E2E2",
        transform: [{rotate: '180deg'}],
      },
      titleText: {
        paddingTop: 15,
        paddingBottom: 15,
        alignSelf:'center',
        textAlign: 'center',
        fontFamily: 'PingFang TC',
        fontWeight: '900',
        fontSize: 20,
        color: 'black',
        opacity: 0.8,
        backgroundColor: 'white',
        borderRadius: 5,
        width: width/2

      },
      descriptionText: {
        fontFamily: 'PingFang TC',
        fontSize: 20,
        color: '#606060',
        textAlign:'center',

      },
      clickButton:{
        marginBottom:50,
      },
      viewSeparator:{
        backgroundColor: 'transparent',
        borderTopWidth: 10,
        borderTopColor: '#2980B9',
        paddingTop:30,
      },

    });
