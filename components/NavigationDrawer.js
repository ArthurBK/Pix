import React, { PropTypes, Component } from 'react';
import Drawer from 'react-native-drawer';
import { DefaultRenderer, Actions } from 'react-native-router-flux';

const propTypes = {
  navigationState: PropTypes.object,
};

class NavigationDrawer extends  Component {
  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (

        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />

    );
  }
}

NavigationDrawer.propTypes = propTypes;

export default NavigationDrawer;
