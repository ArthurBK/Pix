'use strict';
import React, { PropTypes, Component } from 'react';
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  WebView,
  Dimensions,
  Alert,
  Linking
  } = ReactNative;
import {Actions} from "react-native-router-flux";
// import {Tabbar} from "react-native-router-flux";
import Button from "react-native-button";
import CookieManager from 'react-native-cookies';
// import LoggedIn from './LoggedIn'

// Change these to reflect
const LOGIN_URL = "http://www.weflash.io/users/auth/instagram";
const HOME_URL = "http://www.weflash.io/campaigns";
const REQUEST_URL = 'http://www.weflash.io/api/v1/influencers/';


var { width, height } = Dimensions.get('window');



export default class ReactNativeLogin extends  Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loadedCookie: false,
      login_url: "http://www.weflash.io/users/auth/instagram"
    };
  }

  componentWillMount () {
    //
    // Linking.canOpenURL(LOGIN_URL).then(supported => {
    //   if (!supported) {
    //     console.log('Can\'t handle url: ' + LOGIN_URL);
    //   } else {
    //     Linking.openURL(LOGIN_URL);
    //   }
    // }).catch(err => console.error('An error occurred', err));

    //
    CookieManager.get(HOME_URL, (cookie) => {
      console.log(cookie);
      let isAuthenticated;
      // If it differs, change `cookie.remember_me` to whatever the name for your persistent cookie is!!!
      if (cookie && cookie.indexOf('_WeFlash') != -1) {
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
  //
  // componentDidMount() {
  //   Linking.addEventListener('url', this._handleOpenURL);
  // }
  //
  // componentWillUnmount() {
  //   Linking.removeEventListener('url', this._handleOpenURL);
  // }
  //
  // _handleOpenURL(event) {
  //   if (event.url == HOME_URL) {
  //     this.setState({
  //       loggedIn: true,
  //     });
  //
  //     fetch(REQUEST_URL)
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       if (responseData.influencer.email != responseData.influencer.username + "@example.com")
  //       {
  //         // console.log(responseData.influencer.email);
  //         // console.log(responseData.influencer.username + "@example.com");
  //         Actions.tabbar();
  //       }
  //       else {
  //         Actions.emailconfirmation();
  //       }
  //     }).catch((error) =>{console.log(error)});
  //   }
  //   console.log(event.url);
  //
  // }




errorHandler(error)
{

}


  onNavigationStateChange (navState) {
    // If we get redirected back to the HOME_URL we know that we are logged in. If your backend does something different than this
    // change this line.
    //I should add token here / retrieve it here and pass it to each view
    console.log(navState);
    console.log(navState.url);
    if (navState.url == HOME_URL) {
      this.setState({ loggedIn: true });
      fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.influencer.email != responseData.influencer.username + "@example.com")
        {
          Actions.tabbar();
        }
        else {
          Actions.emailconfirmation();
        }
      }).catch((error) =>{console.log(error)});
    }
    else if  (navState.title == "Instagram")
    {
      //
    Actions.login();

    
      // this.setState({login_url: "http://www.weflash.io/users/auth/instagram"})
    }
    else if (navState.domain == "NSURLErrorDomain") {
      Alert.alert( '',
      'Oups! Erreur de connexion',
      [ {text: 'Got it!'},])
      Actions.launch();
    }
  }

  loadingPage(nav)
  {

  }

  render () {
    // If we have completed loading the cookie choose to show Login WebView or the LoggedIn component, else just show an empty View.
    if (this.state.loadedCookie) {
      if (this.state.loggedIn) {
        return (
<View>
</View>
        );
      }
      else {
        return (
          <View style={[styles.container]}>
          <View style={[styles.container]}/>
          <View style={[styles.containerIger]}>
            <WebView
              ref={'webview'}
              automaticallyAdjustContentInsets={false}
              style={styles.webView}
              source={{uri: this.state.login_url}}
              javaScriptEnabled={true}
              onNavigationStateChange={this.onNavigationStateChange.bind(this)}
              startInLoadingState={true}
              scalesPageToFit={true}
              onLoad={this.loadingPage.bind(this)}
            />
          </View>
          <View style={[styles.container]}/>
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
    // backgroundColor: 'blue',
    // width: width / 1.5
  },
  containerIger: {
  flex: 10,
  justifyContent: "center",
  // alignItems: "center",
  // backgroundColor: 'blue',
  // width: width / 1.5
},
});
