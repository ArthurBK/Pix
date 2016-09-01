import React, { PropTypes, Component } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableHighlight, Image, Dimensions} from "react-native";


import {Actions} from "react-native-router-flux";
import ReceiptConfirmedLocalSwaps from './ReceiptConfirmedLocalSwaps'
import ReceiptCompletedLocalSwaps from './ReceiptCompletedLocalSwaps'
import Icon from 'react-native-vector-icons/FontAwesome'

var ScrollableTabView = require('react-native-scrollable-tab-view');


class App extends Component {
  render() {
    return (
      <ScrollableTabView
        style={styles.tabBar}
        tabBarTextStyle={styles.tabBarTextStyle}
        tabBarUnderlineColor='#EE6136'
        tabBarActiveTextColor='#EE6136'
        tabBarInactiveTextColor='#606060'>
        <ReceiptConfirmedLocalSwaps tabLabel={'\uD83D\uDCF8'} />
        <ReceiptCompletedLocalSwaps tabLabel={'\u2705'} />
      </ScrollableTabView>
    );
  }
}



export default class extends  Component {
    render(){
        return (
            <App/>
                  );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginVertical: 5,
    marginHorizontal: 20,
  },
  tabBar: {
    marginTop: 20,
  },
  tabBarTextStyle: {
    fontFamily: 'PingFang TC',
    fontWeight: '600',
    fontSize: 30,
  },
  });
