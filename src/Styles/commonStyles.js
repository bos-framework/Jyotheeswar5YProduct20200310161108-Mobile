import { StyleSheet } from "react-native";
import Constants from '../Resources/constants';
import Colors from '../Resources/colors';
import Fonts from "../Resources/fonts";
import Margins from '../Resources/margins';

const commonStyles = StyleSheet.create({

  logo: {
     width: 160, 
     height: 160 
  },
  // TextInput container style
  textInputContainer: {
    marginTop: 16,
    height: Margins.TEXT_INPUT_HEIGHT,
    borderRadius: Margins.CORNER_RADIUS,
  },
  // TextInput style
  textInputStyle: {
    paddingTop: 2,
    paddingBottom: 0,
    fontFamily: Fonts.fontFamily,
    fontSize: Fonts.FONT_SIZE_N,
    color: Colors.textInputColor,
    height: Margins.TEXT_INPUT_HEIGHT,
    borderRadius: Margins.CORNER_RADIUS,
    paddingLeft: Margins.TEXT_FIELD_PADDING,
    backgroundColor: Colors.textInputBgColor,
  },
  // TextInput border style
  inputBorder: {
    borderWidth: 1,
    marginTop: 10,
    borderColor: Colors.borderColor,
    borderRadius: Margins.CORNER_RADIUS,
  },
  // Error style
  error: {
    marginTop: 5,
    color: Colors.errorColor,
    fontFamily: Fonts.fontFamily,
    fontSize: Fonts.FONT_SIZE_S,
    marginLeft: Margins.TEXT_FIELD_PADDING,

  },
  // Button style 
  btnStyle: {
    borderRadius: 2,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: Fonts.BUTTON_SIZE,
    backgroundColor: Colors.primaryButtonColor,
  },
  buttonText: {
    fontFamily: Fonts.fontFamily,
    fontSize: Fonts.FONT_SIZE_X,
    color: Colors.primaryButtonTextColor
  },
  menuBtn: {
    marginRight: 16,
    height: Fonts.BUTTON_SIZE,
    width: Fonts.BUTTON_SIZE,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: "center"
  },
  logoContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 0.8,
    maxWidth: Constants.FORM_WIDTH,
    width: '100%'
  },
});

export default commonStyles;
