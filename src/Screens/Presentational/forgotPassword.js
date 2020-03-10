/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text,
  SafeAreaView }
   from 'react-native';
import CommonStyles from '../../Styles/commonStyles';
import LogoImage from '../../Components/logoImage';
import Input from '../../Components/input';
import Button from '../../Components/button';
import Helper from '../../Utilities/helper';
import Colors from '../../Resources/colors';
import Loader from "../../Utilities/loader";
import Constants from '../../Resources/constants';
import Fonts from '../../Resources/fonts';

export default class Login extends Component {

  render() {
    const {
      isLoading,
      data,
      onChangeTextHandler,
      onSubmitBtnTapped } = this.props;

    return (

      <SafeAreaView style={{ flex: 1 }}>

        <View style={CommonStyles.container}>

          <Loader loading={isLoading} />

          {/* You can replace your logo and resize your logo container */}
          <View style={CommonStyles.logoContainer}>
            <LogoImage imagePath={require('../../Assets/Images/logo.png')} />
          </View>

          <Text style={styles.headerText}>
            Enter the email address associated with your account, and we’ll email you a temporary password.
          </Text>

          {/* You can add and remove the from Inputfields */}
          <View style={[CommonStyles.formContainer, { marginTop: 20 }]}>
            <Input
              containerStyle={[CommonStyles.inputBorder,
              data.errors.emailError ?
                { borderColor: Colors.errorColor } :
                { borderColor: Colors.borderColor }]}
              secureTextEntry={false}
              capitalize="none"
              keyboardType="email-address"
              placeholder="Email address"
              returnKeyType="done"
              value={data.email}
              changeText={(value) => onChangeTextHandler("email", "emailError", "emailEmpty", value)} />
            {data.errors.emailEmpty ?
              Helper.errorMessage(data.errors.emailEmpty, "Email Id is required.") :
              Helper.errorMessage(data.errors.emailError, "Email is not valid.")}

            <Button
              onPress={onSubmitBtnTapped}
              buttonType="BG-BUTTON"
              marginTop={20}
              buttonText="Submit" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: Fonts.FONT_SIZE_SS,
    width: '100%',
    textAlign: "auto",
    fontFamily: Fonts.fontFamily,
    maxWidth: Constants.FORM_WIDTH,
  }
});

