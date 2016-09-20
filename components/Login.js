'use strict';
import React, { PropTypes, Component } from 'react';
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  WebView,
  Dimensions
  } = ReactNative;
import {Actions} from "react-native-router-flux";
// import {Tabbar} from "react-native-router-flux";
import Button from "react-native-button";
import CookieManager from 'react-native-cookies';
// import LoggedIn from './LoggedIn'

// Change these to reflect
const LOGIN_URL = "http://www.weflash.io/users/auth/instagram";
const HOME_URL = "http://www.weflash.io/campaigns";

var { width, height } = Dimensions.get('window');



export default class ReactNativeLogin extends  Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loadedCookie: false
    };
  }

  componentWillMount () {
    CookieManager.get(HOME_URL, (cookie) => {
      console.log(cookie);
      let isAuthenticated;
      // If it differs, change `cookie.remember_me` to whatever the name for your persistent cookie is!!!
      if (cookie && cookie.indexOf('_PicReward') != -1) {
        isAuthenticated = true;
      }
      else {
        isAuthenticated = false;
      }

      this.setState({
        loggedIn: isAuthenticated,
        loadedCookie: true
      });
    });
  }

  onNavigationStateChange (navState) {
    // If we get redirected back to the HOME_URL we know that we are logged in. If your backend does something different than this
    // change this line.

    //I should add token here / retrieve it here and pass it to each view
    if (navState.url == HOME_URL) {
      this.setState({
        loggedIn: true,
      });
      Actions.emailconfirmation();
    }
  }

  render () {
    // If we have completed loading the cookie choose to show Login WebView or the LoggedIn component, else just show an empty View.
    if (this.state.loadedCookie) {
      if (this.state.loggedIn) {
        return (
<View>
{Actions.emailconfirmation()}
</View>
        );
      }
      else {
        return (
          <View style={[styles.container]}>
          <View style={[styles.container]}>
          </View>
          <View style={[styles.containerIger]}>
            <WebView
              ref={'webview'}
              automaticallyAdjustContentInsets={false}
              style={styles.webView}
              source={{uri: LOGIN_URL}}
              javaScriptEnabled={true}
              onNavigationStateChange={this.onNavigationStateChange.bind(this)}
              startInLoadingState={true}
              scalesPageToFit={true}
            />
          </View>
          <View style={[styles.container]}>
          </View>
          </View>
        );
      }
    }
    else {
      return (
        <View></View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: '#F7F9FA',
    // width: width / 1.5
  },
  containerIger: {
  flex: 3,
  justifyContent: "center",
  // alignItems: "center",
  backgroundColor: '#F7F9FA',
  // width: width / 1.5
},
});
