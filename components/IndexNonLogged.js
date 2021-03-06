import React, { PropTypes, Component } from 'react';
var ReactNative = require('react-native');
var {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Image,
  RefreshControl,
  Dimensions,
  Alert} = ReactNative;
  import Button from "react-native-button";
  import {Actions} from "react-native-router-flux";
  import MapView from 'react-native-maps';

  var { width, height } = Dimensions.get('window');
  var REQUEST_URL = 'http://www.weflash.io/api/v1/campaigns/index';
  const ASPECT_RATIO = width / height;
  const LATITUDE = 48.857913;
  const LONGITUDE = 2.3506647;
  const LATITUDE_DELTA = 0.0050;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  export default class extends  Component {
    constructor(props) {
      super(props);
      this.state = {
        region: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
        markers: [],
        cLongitude: '',
        cLatitude: '',
        refreshing: false,
      };
    }

    componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var cLongitude = JSON.stringify(position.coords.longitude);
          var cLatitude = JSON.stringify(position.coords.latitude);
          this.setState({cLongitude: cLongitude, cLatitude: cLatitude});
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      this.fetchData();
    }

    compare(a,b) {
      aLatitude = a.coordinate.latitude
      aLongitude = a.coordinate.longitude
      bLatitude = b.coordinate.latitude
      bLongitude = b.coordinate.longitude
      aDistance = this.distance(this.state.cLongitude, this.state.cLatitude, aLongitude, aLatitude)
      bDistance = this.distance(this.state.cLongitude, this.state.cLatitude, bLongitude, bLatitude)
      if (aDistance < bDistance)
        return -1;
      if (aDistance > bDistance)
        return 1;
      return 0;
    }

    distance(cLongitude, cLatitude, aLongitude, aLatitude) {
      erdRadius = 6371;
      cLongitude = cLongitude * (Math.PI / 180);
      cLatitude = cLatitude * (Math.PI / 180);
      aLongitude = aLongitude * (Math.PI / 180);
      aLatitude = aLatitude * (Math.PI / 180);
      x0 = cLongitude * erdRadius * Math.cos(cLatitude);
      y0 = cLatitude * erdRadius;
      x1 = aLongitude * erdRadius * Math.cos(aLatitude);
      y1 = aLatitude * erdRadius;
      dx = x0 - x1;
      dy = y0 - y1;
      d = Math.sqrt((dx * dx) + (dy * dy));
      return d = Math.round(d * 1000);
    };

    fetchData() {
      fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.campaigns.locals.sort(this.compare.bind(this))),
          markers: responseData.campaigns.locals,
          loaded: true,
        });
      })
      .catch((error) =>{console.log(error)});
    }

    _onRefresh() {
      this.setState({refreshing: true});
      this.fetchData();
      this.setState({refreshing: false});
    }

    updateFocusLastLineRow()
    {
      const rowID = this.state.dataSource._cachedRowCount - 1;
      console.log(rowID);
      var nLatitude = this.state.dataSource.getRowData(0,rowID).coordinate_copy.latitude;
      var nLongitude = this.state.dataSource.getRowData(0,rowID).coordinate_copy.longitude;
      var { region } = this.state;

      this._mapview.animateToRegion(
        ...this.state.region,
        latitude: nLatitude,
        longitude: nLongitude,
      )
    }

    updateFocus(visibleRows, changedRows)
    {
      var rowArrayIndex =  Object.keys(visibleRows.s1).length - 1
      var rowID =  Object.keys(visibleRows.s1)[rowArrayIndex] - 1
      if (rowID == -1)
        rowID = 0;
      if (rowID == this.state.dataSource._cachedRowCount - 2
      && Object.keys(changedRows.s1)[0] == rowID - 1
      && Object.values(changedRows.s1)[0] == false)
        rowID += 1;
      var nLatitude = this.state.dataSource.getRowData(0,rowID).coordinate_copy.latitude;
      var nLongitude = this.state.dataSource.getRowData(0,rowID).coordinate_copy.longitude;
      var { region } = this.state;
      this._mapview.animateToRegion({
        ...this.state.region,
        latitude: nLatitude,
        longitude: nLongitude,
      },
    )
    }

    onRegionChange(region) {
      this.setState({ region });
    }

    header(){
      return(
        <MapView
          ref={(comp) => this._mapview = comp}
          style={styles.map}
          region={this.state.region}
          showsUserLocation={true}
          >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.product}
              />
          ))}
        </MapView>
      );

    }

    footer(){
      return(
        <View style={styles.emptyFooter}>
        </View>
      );
    }
    login_alert(){
      return(
        Alert.alert(
        'Connectez votre compte Instagram pour en savoir plus?',
        null,
       [
        {text: 'Fermer'},
        {text: 'Se connecter', onPress: () => this.login({type: 'reset'})}
        ]
      )
      );
    }

    renderCampaign(campaign) {
      return (
        <TouchableHighlight
          key={'item-' + campaign.id}
          onPress={() =>   Alert.alert(
            'Connectez votre compte Instagram pour en savoir plus',
            null,
           [
            {text: 'Fermer'},
            {text: 'Se connecter', onPress: () => Actions.login({type: 'reset'})}
            ]
          )}
          underlayColor='#dddddd'>
          <View
            style={styles.container}>
            <View >
              <Image
                source={{uri: campaign.photo.photo.url}}
                style={styles.thumbnail}>
              <View styles={styles.textImage}></View>
                </Image>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.leftSideText}>
              <Text style={styles.titleText}>
              {campaign.title}
              </Text>
                <Text style={styles.productText}>
                  {campaign.product}
                </Text>
              </View>
              <View >
                <Text style={styles.followersText}>
                  300 followers
                </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      );
    }

    render(){
      const drawer = this.context.drawer;
      return (
        <ListView
          refreshControl={ <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)} /> }
          ref={(comp) => this._mylist = comp}
          dataSource={this.state.dataSource}
          renderRow={this.renderCampaign}
          style={styles.listView}
          renderSectionHeader={this.header.bind(this)}
          renderFooter={this.footer}
          // onEndReached={this.updateFocusLastLineRow.bind(this)}
          onChangeVisibleRows={this.updateFocus.bind(this)}
          enableEmptySections={true}/>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      borderBottomColor:'#EBEFEF',
      borderBottomWidth: 0.5,
      borderTopColor:'#EBEFEF',
      borderTopWidth: 0.5,
      height: height/2,
    },
    listView: {
      backgroundColor: "white"
    },
    thumbnail: {
      width: width,
      height: height*(3/8),
      backgroundColor: "#E2E2E2",
    },
    welcome: {
      fontSize: 40,
      textAlign: 'center',
      color: 'red',
      margin: 80,
    },
    bottomContainer: {
      flexDirection:'row',
      backgroundColor:'white',
      width: width,
      height: height*(1/8),
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#fbfbfb'
    },
    padding: {
      padding: 10,
    },
    map: {
      height: height/3,
      width:width
    },
    titleText: {
      fontFamily: 'PingFang TC',
      fontWeight: '800',
      fontSize: 26,
      color: '#2980B9',
    },
    followersText: {
      fontFamily: 'PingFang TC',
      fontWeight: '800',
      fontSize: 14,
      color: '#2980B9',
      paddingRight: 10,
      paddingTop:10
    },
    productText: {
      fontFamily: 'PingFang TC',
      fontSize: 19,
      color: '#606060',
    },
    leftSideText: {
      paddingLeft: 10,
      paddingTop: 10,
    },
    emptyFooter: {
      height: height/10
    }
  });
