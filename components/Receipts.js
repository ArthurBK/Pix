import React, { PropTypes, Component } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableHighlight, Image, Dimensions} from "react-native";


import {Actions} from "react-native-router-flux";
import ReceiptConfirmedLocalSwaps from './ReceiptConfirmedLocalSwaps'
import ReceiptCompletedLocalSwaps from './ReceiptCompletedLocalSwaps'
import Icon from 'react-native-vector-icons/FontAwesome'
import ScrollableTabView from 'react-native-scrollable-tab-view'


class App extends Component {
  render() {
    return (
      <ScrollableTabView
      locked={true}
        style={styles.tabBar}
        tabBarTextStyle={styles.tabBarTextStyle}
        tabBarUnderlineColor='#2980B9'
        tabBarActiveTextColor='#2980B9'
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
    // flex:1
  },
  tabBarTextStyle: {
    fontFamily: 'PingFang TC',
    fontWeight: '600',
    fontSize: 30,
  },
  });
