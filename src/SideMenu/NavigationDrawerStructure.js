import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

class NavigationDrawerStructure extends Component {

  // Structure for the navigation Drawer.
  toggleDrawer = () => {
    // Props to open/close the drawer.
    this.props.navigationProps.toggleDrawer();
  };
  
  // Component render.
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('../Assets/Images/menu.png')}
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default NavigationDrawerStructure;