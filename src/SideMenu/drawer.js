import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import PropTypes from "prop-types";
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    Alert,
    Image,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import Colors from '../Resources/colors';
import { connect } from 'react-redux';
import Helper from '../Utilities/helper';
import Fonts from "../Resources/fonts";
import NavigationService from '../Navigator/NavigationService';
import AppData from '../store/AppData';
import { logoutUser } from '.././actions';

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.onLogoutPressed = this.onLogoutPressed.bind(this);
    this.navigateToScreen = this.navigateToScreen.bind(this);
  }

  // Navigation to a screen from selected option in Drawer screen.
  navigateToScreen = (route, title) => () => {
    const navigate = NavigationActions.navigate({
      params: {headerTitle: title},
      routeName: route,
    });
    this.props.navigation.dispatch(navigate);
  };

  // Logout Action
  onLogoutPressed = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to Logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.navigateToAuth()},
      ],
      {cancelable: false},
    );
  };

  /*
    Remove user & token from local storage and Application state to log user out.
    And navigate to login screen.
    */
  navigateToAuth() {
    AppData.clearData(status => {
      if (status) {
        this.props.logoutUser();
        NavigationService.navigate('Auth');
      } else {
        alert('Something went wrong. Please try again!');
      }
    });
  }

  // Render
  render() {
    let {userDetails} = this.props;
    let userName = Helper.isEmpty(userDetails)
      ? ''
      : `${userDetails.FirstName} ${userDetails.LastName}`;

    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            marginTop: 8,
            marginLeft: 8,
            height: 44,
            borderBottomColor: '#4a4a4a',
            borderBottomWidth: 0.5,
          }}>
          <Text style={styles.userName}> {userName}</Text>
        </View>
        <ScrollView>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={this.navigateToScreen('ChangePass', 'Change Password')}>
            <Image
              source={require('../Assets/Images/key.png')}
              style={{
                height: 20,
                width: 20,
              }}
            />
            <Text style={styles.name}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={this.navigateToScreen('WebLink', 'Terms & Conditions')}>
            <Image
              source={require('../Assets/Images/terms.png')}
              style={{
                height: 20,
                width: 20,
              }}
            />
            <Text style={styles.name}>Terms & Conditions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={this.navigateToScreen('WebLink', 'About')}>
            <Image
              source={require('../Assets/Images/about.png')}
              style={{
                height: 20,
                width: 20,
              }}
            />
            <Text style={styles.name}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={this.navigateToScreen('WebLink', 'Help')}>
            <Image
              source={require('../Assets/Images/help.png')}
              style={{
                height: 20,
                width: 20,
              }}
            />
            <Text style={styles.name}>Help</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.onLogoutPressed()}>
            <Image
              source={require('../Assets/Images/logout.png')}
              style={{
                height: 20,
                width: 20,
              }}
            />
            <Text style={styles.name}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
        <Text style={styles.builtOnBos}>Built on BOS</Text>
      </SafeAreaView>
    );
  }
}

Drawer.propTypes = {
    navigation: PropTypes.object
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondaryAppThemeColor,
    },
    userName: {
        height: 44,
        fontSize: 18,
        fontWeight: "600",
        color: Colors.primaryAppThemeColor,
        fontFamily: Fonts.fontFamily
    },
    menuItem: {
        flex: 1,
        height: 40,
        margin: 10,
        marginLeft: 4,
        marginRight: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    name: {
        flex: 0.8,
        height: 25,
        lineHeight: 25,
        fontSize: 16,
        marginLeft: 12,
        justifyContent: "center",
        fontFamily: Fonts.fontFamily,
        color: Colors.primaryAppThemeColor
    },
    builtOnBos: {
        fontSize: 18,
        marginBottom: 20,
        marginLeft: 30,
        fontWeight: "600",
        fontFamily: Fonts.fontFamily,
        color: Colors.primaryAppThemeColor

    }
});

const mapStateToProps = state => {
    let { userDetails } = state.user;
    return { userDetails };
};

export default connect(mapStateToProps, {logoutUser})(Drawer);
