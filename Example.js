import React, { Component } from 'react';
import {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import Launch from './components/Launch'
import Register from './components/Register'
import Login from './components/Login'
import Login2 from './components/Login2'
import Login3 from './components/Login3'
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
import Error from './components/Error'
import Home from './components/Home'
import NavigationDrawer from './components/NavigationDrawer'
import CampaignsList from './components/CampaignsList'
import CampaignDetail from './components/CampaignDetail'
import CampaignSwap from './components/CampaignSwap'
import CampaignSwapConfirmation from './components/CampaignSwapConfirmation'
import Receipts from './components/Receipts'
import ReceiptHashtags from './components/ReceiptHashtags'
import Profile from './components/Profile'
import Icon from 'react-native-vector-icons/FontAwesome'

import Button from "react-native-button";

class TabIcon extends React.Component {
  render(){
    return (
      <Text style={{color: this.props.selected ? "#2980B9" :"#8D8D8D"}}>{this.props.title}</Text>
    );
  }
}

class Right extends React.Component {
  render(){
    return <Text style={{
        width: 80,
        height: 37,
        position: "absolute",
        bottom: 4,
        right: 2,
        padding: 8,
      }}>Right</Text>
    }
  }

  const styles = StyleSheet.create({
    container: {flex:1, backgroundColor:"transparent",justifyContent: "center",
      alignItems: "center",}

    });

    const reducerCreate = params=>{
      const defaultReducer = Reducer(params);
      return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
      }
    };

    // define this based on the styles/dimensions you use
    const getSceneStyle = function (/* NavigationSceneRendererProps */ props, computedProps) {
      const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
      };
      if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 64;
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
      }
      return style;
    };

    let currentSwitchPage = 'text1';

    const SwitcherPage = function (props) {
      return (
        <View>
          <Text style={{marginTop:100,textAlign:'center'}}>current page: {props.text}</Text>
          <Button
            onPress={() => {
              currentSwitchPage = currentSwitchPage === 'text1' ? 'text2' : 'text1';
              Actions.refresh({key: 'switcher'});
            }}
            >
            Switch!
          </Button>
          <Button
            onPress={() => {
              Actions.launch({type:'reset'});
            }}
            >
            Exit
          </Button>
        </View>
      );
    };

    export default class Example extends React.Component {
      render() {
        return <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
          <Scene key="modal" component={Modal} >
            <Scene key="root" hideNavBar hideTabBar>
              <Scene key="register" component={Register} title="Register"/>
              <Scene key="register2" component={Register} title="Register2" duration={1}/>
              <Scene key="home" component={Home} title="Replace"  />
              <Scene key="launch" component={Launch} title="Launch" initial={true} />
              <Scene key="login"  >
                <Scene key="loginModal" component={Login} title="Login"/>
                <Scene key="loginModal2" hideNavBar={true} component={Login2} title="Login2" panHandlers={null} duration={1}/>
                <Scene key="loginModal3" hideNavBar={true} component={Login3} title="Login3" panHandlers={null} duration={1}/>
              </Scene>
              <Scene key="tabbar" component={NavigationDrawer}>
                <Scene key="main" tabs={true} >
                  <Scene key="receipts_path" title={<Icon name="shopping-basket" size={30}/>} hideNavBar={true} icon={TabIcon}>
                    <Scene key="receipts" initial={true} component={Receipts} />
                    <Scene key="receipt_hashtags" component={ReceiptHashtags}  hideTabBar={true}  direction="vertical" />
                  </Scene>
                  <Scene key="campaigns_path" title={<Icon name="glass" size={30} />} initial={true} hideNavBar={true} icon={TabIcon}>
                    <Scene key="campaigns" component={CampaignsList}  />
                    <Scene key="campaign_detail" component={CampaignDetail} direction="vertical" hideTabBar={true} />
                    <Scene key="campaign_swap" component={CampaignSwap} hideTabBar={true} />
                    <Scene key="campaign_swap_confirmation" component={CampaignSwapConfirmation} hideTabBar={true} />
                  </Scene>
                  <Scene key="profile" component={Profile} title={<Icon name="user" size={30}/>} hideNavBar={true} icon={TabIcon}/>
                </Scene>
              </Scene>
            </Scene>
            <Scene key="error" component={Error}/>
          </Scene>
        </Router>;
      }
    }
