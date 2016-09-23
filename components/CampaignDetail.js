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
    ListView,
  Alert
  } = ReactNative;
  import * as Animatable from 'react-native-animatable';
  import Button from "react-native-button";
  import {Actions} from "react-native-router-flux";
  // import Emoji from "react-native-emoji";
  // @makePannable


  // Navigator.SceneConfigs.FloatFromRight.gestures.pop.edgeHitWidth = 300

  var { width, height } = Dimensions.get('window');

  const REQUEST_URL = 'http://www.weflash.io/api/v1/campaigns/confirmed_local_campaigns';
  const REQUEST_URL2 = 'http://www.weflash.io/api/v1/influencers/';
  const MIN_FOLLOWERS = 300;




  export default class extends  Component {

    constructor(props) {
      super(props);
      this.state = {
        cLongitude:'',
        cLatitude:'',
        laLatitude:'',
        laLongitude:'',
        dataSourceInfluencer: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
      };
    }
    _containerStyles: {}
    // container: (null : ?{ setNativeProps(props: Object): void })
  // watchID: (null : ?number)





  watchID () {
    (null: ?number)
  };

    //
    // postapplication() {
    //   // name = this.props.campaign.name
    //   fetch('http://picreward.herokuapp.com/api/v1/applications', {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-User-Email": "arthurbonnecarrere@example.com",
    //       "X-User-Token": "y4msWpSRPovE4hxH83tZ",
    //     },
    //     body: JSON.stringify(
    //       { application:
    //         { campaign_id: this.props.campaign.id,
    //           status: 'Confirmed',
    //           motivation: 'need to check validation ActiveREcords'
    //         }
    //       })
    //
    //     })
    //
    //   }
    fetchData()
    {
      fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.campaigns.confirmed_local_campaigns),
          // campaigns: responseData.campaigns,
          // loaded: true,
        });
      })
      //  console.log(this.state.campaigns);
      .catch((error) =>{console.log(error)});

      fetch(REQUEST_URL2)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSourceInfluencer: responseData.influencer,
          loaded: true,
        });
      })
      .catch((error) =>{console.log(error)});
    }

      checkLocation () {
            erdRadius = 6371
            cLongitude = this.state.cLongitude * (Math.PI / 180)
            cLatitude = this.state.cLatitude * (Math.PI / 180)
            aLongitude = this.props.campaign.coordinate_copy.longitude * (Math.PI / 180)
            aLatitude = this.props.campaign.coordinate_copy.latitude * (Math.PI / 180)

            x0 = cLongitude * erdRadius * Math.cos(cLatitude)
            y0 = cLatitude * erdRadius

            x1 = aLongitude * erdRadius * Math.cos(aLatitude)
            y1 = aLatitude * erdRadius

            dx = x0 - x1
            dy = y0 - y1

            d = Math.sqrt((dx * dx) + (dy * dy))

            d = Math.round(d * 1000)
  // console.log(d);
  // 50.806994
  // 4.371628099999953
console.log(this.state.dataSourceInfluencer.followers)
  if (this.state.dataSourceInfluencer.followers - MIN_FOLLOWERS < 0
  || this.state.dataSourceInfluencer.followers == undefined)
  {
    // console.log(this.state.dataSourceInfluencer.followers - MIN_FOLLOWERS);
    Alert.alert( '\uD83D\uDE4C Wow \uD83D\uDE4C', '\uD83D\uDE4C Il te faut plus de followers \uD83D\uDE4C',
    [ {text: 'Got it!'},])
  }
  else if (this.state.dataSourceInfluencer.post_photo == true)
   {
     Alert.alert( '\uD83D\uDCF8 Tu as oublié le plus important \uD83D\uDCF8', 'Swap à nouveau quand tu auras posté ta photo',
     [ {text: 'Got it!'},])
   }
  else if (d > 200)
  {
    Alert.alert( '\uD83D\uDCCD \u2796 \u2796 \u2796 \u2796 \uD83C\uDFC3',
    'Rends toi sur place pour Swapper',
    [ {text: 'Got it!'},])
  }
  else
  {
    Actions.campaign_swap({photo: this.props.campaign.photo, id: this.props.campaign.id});
  }
}



  //       componentWillMount() {
  //         this._previousLeft = 0;
  //         this._containerStyles = {
  //           style: {
  //             left: this._previousLeft,
  //           }
  //         };
  //         this._panResponder = PanResponder.create({
  //
  //           onStartShouldSetPanResponder: (evt, gestureState) => true,
  //           onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
  //           onMoveShouldSetPanResponder: (evt, gestureState) => true,
  //           onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
  //
  //           onPanResponderMove: (e, gestureState) => {
  //
  //             if (gestureState.dx > 50) {
  //               if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
  //                 // Actions.pop();
  //               }
  //
  //               //  console.log(gestureState.dx);
  //             } else if (gestureState.dx > 0) {
  //               // this._containerStyles.style.left = this._previousLeft + gestureState.dx;
  //               // this._updateNativeStyles();
  //
  //
  //             }
  //             navigator.geolocation.clearWatch(this.watchID);
  //
  //           },
  //
  //           // Claim responder if it's a horizontal pan
  //           // onMoveShouldSetPanResponder: (e, gestureState) => {
  //           //   // console.log(gestureState.dx);
  //           //   if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
  //           //     return true;
  //           //   }
  //           // },
  //
  //           onPanResponderRelease: (e, gestureState) => {
  //             // console.log(gestureState)
  //             this._previousLeft += gestureState.dx;
  // // not working..
  //             // Actions.pop();
  //             // Actions.tab3_2({campaign}) ;
  //      }
  //
  //         })
  //
  //
  //
  //       }

  componentDidMount(){
    this.fetchData();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
        var cLongitude = JSON.stringify(position.coords.longitude);
        var cLatitude = JSON.stringify(position.coords.latitude);
        this.setState({cLongitude: cLongitude, cLatitude: cLatitude});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );


    this.watchID = navigator.geolocation.watchPosition( (position) => {
      var laLongitude = JSON.stringify(position.coords.longitude);
      var laLatitude = JSON.stringify(position.coords.latitude);
      this.setState({laLatitude: laLatitude, laLongitude: laLongitude});
    });

  }




        _updateNativeStyles() {
          // this.container && this.container.setNativeProps(this._containerStyles);
        }


        render(){
          return (


            <Animatable.View
              style={styles.container}

              >
              <View

                >

                <Image
                  source={{uri: this.props.campaign.photo.photo.url}}
                  style={styles.thumbnail}
                  />

                <View style={{paddingLeft: 10, paddingBottom: 2, paddingRight: 10}}>
                  <Text style={styles.titleText}>
                    {this.props.campaign.title}
                  </Text>
                </View>
                <View style={{paddingLeft: 10, paddingBottom: 2, paddingRight: 10}}>
                  <Text style={styles.productText}>
                    {this.props.campaign.product}
                  </Text>
                </View>
                <View style={{paddingLeft: 10, paddingBottom: 2, paddingRight: 10}}>
                  <Text style={styles.descriptionText}>
                    {this.props.campaign.description}
                  </Text>
                </View>
              </View>
  <View style={styles.buttonContainer}>
  <View></View>
              <Button style={styles.profileButton}>
                <TouchableHighlight
                  onPress={this.checkLocation.bind(this)}
                  style={styles.buttonHighlight}
                  >
                  <Text style={styles.buttonText}>SWAP</Text>
                </TouchableHighlight>
              </Button>
  </View>
            </Animatable.View>


          );
        }
      }


      const styles = StyleSheet.create({
        container: {
          flex: 1,
          left: 0,
          backgroundColor: "white",
        },
        buttonContainer: {
          flex: 1,
          justifyContent: 'space-between',
          marginBottom: 20,
        },

        content: {
          flex: 1,
          borderBottomColor: "#8D8D8D",
          borderBottomWidth: 25,
          borderTopColor: "#8D8D8D",
          borderTopWidth: 25,
          marginBottom: 60,
          height: height/2,
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
          // flex:1,
          // alignItems: "stretch",
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height/2,
          backgroundColor: "#E2E2E2",
          // borderRadius: 5,
        },
        titleText: {
          fontFamily: 'PingFang TC',
          fontWeight: '900',
          fontSize: 34,
          color: '#2980B9',
          marginLeft: 10,
          marginTop: 10,
        },
        followersText: {
          fontFamily: 'PingFang TC',
          fontWeight: '800',
          fontSize: 13,
          color: '#2980B9',
        },
        productText: {
          fontFamily: 'PingFang TC',
          fontSize: 24,
          color: '#001929',
          marginLeft: 10
        },
        descriptionText: {
          fontFamily: 'PingFang TC',
          fontSize: 20,
          color: '#606060',
          marginLeft: 10
        },
      });
