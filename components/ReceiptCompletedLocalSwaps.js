import React, { PropTypes, Component } from 'react';
var ReactNative = require('react-native');
var {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Image,
  Dimensions,
  RefreshControl
} = ReactNative;

import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome'

var REQUEST_URL = 'http://localhost:3000/api/v1/campaigns/completed_local_campaigns';
var { width, height } = Dimensions.get('window');


export default class extends  Component {
  constructor(props) {
    super(props);

    this.state = {
      campaigns: null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData();
    this.setState({refreshing: false});
  }




  fetchData() {
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      // console.log(responseData);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.campaigns.completed_local_campaigns),
        campaigns: responseData.campaigns,
        loaded: true,
      });
    })
    //  console.log(this.state.campaigns);
    .catch((error) =>{console.log(error)});

  }




  renderCampaign(campaign) {
    return (
      <TouchableHighlight onPress={() => Actions.receipt_instructions({campaign})}
        underlayColor='#dddddd'>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <View style={styles.splitLeftContainer}>
              <View style={styles.iconCamera}>
                <Icon name="camera" size={15} color='#2980B9'/>
              </View>
              <View>
                <Text style={styles.productText}>
                  {campaign.product}
                </Text>
                <Text style={styles.followersText}>
                  Post photo
                </Text>
              </View>
            </View>
          </View>
          <View >
            <Image
              source={{uri: campaign.photo.photo.url}}
              style={styles.thumbnail}
              />
          </View>
        </View>
      </TouchableHighlight>
    );

  }

  render(){
    var {View, Text} = React;
    var Button = require("react-native-button");
    var Actions = require("react-native-router-flux").Actions;
    const drawer = this.context.drawer;
    return (
      <ListView
        refreshControl={ <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)} /> }
          dataSource={this.state.dataSource}
          renderRow={this.renderCampaign}
          enableEmptySections={true}
          style={styles.listView}
          />
      );
    }
  }




  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderBottomColor:'#E2E2E2',
      borderBottomWidth: 0.5,
      borderTopColor:'#E2E2E2',
      borderTopWidth: 0.5,
      // marginVertical: 3,
      // marginHorizontal: 2,
      // borderRadius: 5,
    },
    thumbnail: {
      width: height/4,
      height: height/4,
      backgroundColor: "#E2E2E2",
      // borderRadius: 5,
    },
    listView: {
      marginBottom: 55,
    },
    welcome: {
      fontSize: 40,
      textAlign: 'center',
      color: 'red',
      margin: 80,
    },
    leftContainer: {
      flex: 1,
      paddingTop: 20,
      paddingLeft: 20,
      // justifyContent: 'space-between',
      // backgroundColor:'green',
      height: height/4
    },

    titleText: {
      fontFamily: 'PingFang TC',
      fontWeight: '800',
      fontSize: 25,
      color: '#606060',
    },
    followersText: {
      // fontFamily: 'PingFang TC',
      // fontWeight: '800',
      fontSize: 18,
      color: '#2980B9',
      fontStyle: 'italic'
    },
    productText: {
      fontFamily: 'PingFang TC',
      fontSize: 20,
      color: '#606060',
    },
    splitLeftContainer:{
      // backgroundColor: 'yellow',
      flex: 1,
      flexDirection: 'row'
    },
iconCamera: {
paddingTop: 8,
paddingRight:10,
}
  });
