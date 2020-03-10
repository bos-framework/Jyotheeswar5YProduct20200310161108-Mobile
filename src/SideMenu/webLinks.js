import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { WebView } from 'react-native-webview';
import Colors from '../Resources/colors';
import NavigationService from '../Navigator/NavigationService';

export default class WebLinks extends Component {

  static navigationOptions = () => {
    return {
      headerRight: (
        <TouchableWithoutFeedback onPress={ () => NavigationService.navigate("Home")}>
          <View style={styles.cancelContainer}>
            <Text style={styles.cancelText}>Cancel</Text>
          </View>
        </TouchableWithoutFeedback>
      ),
      headerStyle: {
        backgroundColor: Colors.primaryAppThemeColor,
      }
    };
  };

  render() {
    return (
      <View style={styles.container} >
        <WebView
          source={{ uri: 'https://www.bosframework.com/' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cancelContainer: {
    height: 25,
    width: 100,
    marginRight: 10,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  cancelText: {
    fontSize: 16,
    padding: 2,
    color: Colors.secondaryButtonTextColor,
  }
});