import React from 'react';
import { Text, Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from "../Resources/colors";
import Fonts from '../Resources/fonts';


const CardView = (props) => {
  return (
    <View style={[styles.container, { backgroundColor: props.item.color }]}>
      <View style={styles.logoContainer}>
        <Image source={require('../Assets/Images/smallLogo.png')} styles={{ width: 30, height: 15 }} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => { props.signUpPress(props.index) }}>
        <Text style={styles.buttonText}> {props.name} </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => { props.loginPress(props.item, props.index) }}
        style={styles.login}>
        <Text style={{ color: Colors.primaryAppThemeColor, fontFamily: Fonts.fontFamily, fontSize: Fonts.FONT_SIZE_SS }}>Already have an account? <Text style={{
          color: Colors.primaryAppThemeColor, fontWeight: Fonts.FONT_WEIGHT,
          fontFamily: Fonts.fontFamily, fontSize: Fonts.FONT_SIZE_SS
        }}>Login</Text></Text>
      </TouchableOpacity>
    </View>
  )
}
export default CardView;

const styles = StyleSheet.create({
  container: {
    height: 270,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  logoContainer: {
    width: "100%",
    marginBottom: 40,
    alignItems: "center"
  },
  button: {
    alignItems: 'center',
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: Fonts.FONT_WEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: Fonts.fontFamily,
    color: Colors.primaryAppThemeColor
  },
  login: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});











