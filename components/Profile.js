import React, { PropTypes, Component } from 'react';
import {View, Text, StyleSheet, ScrollView,TouchableHighlight, Image, Dimensions} from "react-native";

import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import CookieManager from 'react-native-cookies';
import Icon from 'react-native-vector-icons/FontAwesome'

var REQUEST_URL = 'http://localhost:3000/api/v1/influencers/';
//need to change 31 dynamically
var { width, height } = Dimensions.get('window');

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      influencer: '',
      dataSource: '',
      loaded: false,
      cLongitude: 'unknown',
      cLatitude: 'unknown',
    };
  }

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.dataSource.username && nextProps.dataSource.photo){
  //     this.fetchData();
  //   }
  // }
  //
  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      // console.log(responseData);
      this.setState({
        dataSource: responseData.influencer,
        influencer: responseData,
        loaded: true,
      });
      //  console.log(this.state.influencer);
    })
    //  console.log(this.state.influencer);
    .catch((error) =>{console.log(error)});

  // console.log(this.state.dataSource);
  }



  postinfo () {
    fetch('http://localhost:3000/api/v1/applications/3', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-User-Token': 'y4msWpSRPovE4hxH83tZ',
      },
      body: JSON.stringify(
        { application: { status: 'Hello From RN'
        }
      })

    })

  }

  logout () {
    CookieManager.clearAll((err, res) => {
      // console.log(err);
      // console.log(res);
    });

    this.setState({
      loggedIn: false,
    });
  }

  render(){
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerText}>
                Account
              </Text>
            </View>
            <View>
              <Image
              source={{uri: this.state.dataSource.photo}}
              style={styles.thumbnail}
                />
            </View>
            <View>

            </View>
            <Text style={styles.headerText}>
              @{this.state.dataSource.username}
            </Text>
          </View>
          <View style={styles.profileInfo}>
          <View style={styles.content}>
          <Button style={styles.profileButton} onPress={Actions.register} >
             <Text style={styles.buttonText}>Email</Text>
             <Text style={styles.buttonRightClick}>></Text>
             </Button>
          </View>
          <View style={styles.content}>
          <Button style={styles.profileButton} onPress={Actions.register} >
             <Text style={styles.buttonText}>Addresses</Text>
             <Text style={styles.buttonRightClick}>></Text>
             </Button>
          </View>
          <View style={styles.content}>
          <Button style={styles.profileButton} onPress={Actions.register} >
             <Text style={styles.buttonText}>FAQS</Text>
             <Text style={styles.buttonRightClick}>></Text>
             </Button>
          </View>
          <View style={styles.content}>
          <Button style={styles.profileButton} onPress={Actions.register} >
             <Text style={styles.buttonText}>Email</Text>
             <Text style={styles.buttonRightClick}>></Text>
             </Button>
          </View>
          <View style={styles.content}>
          <Button style={styles.profileButton} onPress={this.logout.bind(this)} >
             <Text style={styles.buttonText}>LOGOUT</Text>
             <Text style={styles.buttonRightClick}>></Text>
             </Button>
          </View>
          <View style={styles.content}>
          <Button style={styles.profileButton} onPress={this.postinfo} >
             <Text style={styles.buttonText}>POST BUTTON(t)</Text>
             <Text style={styles.buttonRightClick}>></Text>
             </Button>
          </View>
        </View>
        </View>
      </ScrollView>
    );
  }
}

var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get("window");


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

buttonText:{
textAlign:'left',
height: 50,
padding: 16,
backgroundColor: "white",
textAlign: 'left',
fontSize: 18,
width: width/2,
color: '#8D8D8D',
},

buttonRightClick:{
textAlign:'right',
width: width/2,
height: 50,
padding: 20,
backgroundColor: "white",
fontSize: 15,
color: '#606060',

},


content: {
  borderBottomColor: "#8D8D8D",
  borderBottomWidth: 0.5,
  borderTopColor: "#8D8D8D",
  borderTopWidth: 0.5,
  // flexDirection: 'row',
},

  header: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EE6136",
    height: 250,
    width: deviceWidth,
    paddingTop: 50,
  },
  headerText: {
    // fontFamily: 'PingFang TC',
    // fontWeight: '800',
    // fontSize: 25,
    // color: '#E7E7E7',
    // paddingBottom: 20,
  },
  thumbnail: {
    width: 70,
    height: 70,
    backgroundColor: "#E2E2E2",
    borderRadius: 35,
  },
  profileButton:{
    // width: width,

  },
  profileInfo:{
    paddingTop:50,
    marginBottom: 70,
  }

});