import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView
}
  from 'react-native';

class HomeContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={{ fontSize: 16, marginTop: 30 }}> Your program goes here...  </Text>
          <Image style={{ width: '100%', height: '100%' }} resizeMode='contain' source={require('../../Assets/Images/placeholder.png')} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
});

export default HomeContainer;
