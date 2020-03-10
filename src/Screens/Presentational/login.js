import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
} from 'react-native';
import CommonStyles from '../../Styles/commonStyles';
import LogoImage from '../../Components/logoImage';
import Input from '../../Components/input';
import Button from '../../Components/button';
import Helper from '../../Utilities/helper';
import Loader from "../../Utilities/loader";
import Colors from '../../Resources/colors';

export default class Login extends Component {

  render() {

    const {
      isLoading,
      data,
      onPressLogin,
      onPressForgotpassword,
      onPressRegister,
      onChangeTextHandler } = this.props;

    return (
      <SafeAreaView style={{ flex: 1 }}>

        <View style={CommonStyles.container}>

          <Loader loading={isLoading} />

          {/* You can replace your logo and resize your logo container */}
          <View style={CommonStyles.logoContainer}>
            <LogoImage imagePath={require('../../Assets/Images/logo.png')} />
          </View>

          {/* Form input fields */}
          <View style={CommonStyles.formContainer}>
            <Input
              containerStyle={[CommonStyles.inputBorder,
              data.errors.emailError ?
                { borderColor: Colors.errorColor } :
                { borderColor: Colors.borderColor }]}
              secureTextEntry={false}
              capitalize="none"
              keyboardType="email-address"
              placeholder="Email address"
              returnKeyType="next"
              value={data.email}
              changeText={(value) => onChangeTextHandler("email", "emailError", "emailEmpty", value)} />

            {data.errors.emailEmpty ?
              Helper.errorMessage(data.errors.emailEmpty, "Email Id is required.") :
              Helper.errorMessage(data.errors.emailError, "Email is not valid.")}

            <Input
              containerStyle={[CommonStyles.inputBorder,
              data.errors.passwordEmpty
                ? { borderColor: Colors.errorColor }
                : { borderColor: Colors.borderColor }]}
              secureTextEntry={true}
              capitalize="none"
              keyboardType="default"
              placeholder="Password"
              returnKeyType="done"
              value={data.password}
              changeText={(value) => onChangeTextHandler("password", "passwordEmpty", null, value)} />

            {Helper.errorMessage(data.errors.passwordEmpty, "Password is required.")}

            {/* Login buttton */}
            <Button
              onPress={onPressLogin}
              marginTop={20}
              buttonType="BG-BUTTON"
              buttonText="Login" />


            {/*Forgot Password underline button */}
            <Button
              onPress={onPressForgotpassword}
              marginTop={5}
              buttonText="Forgot password?" />
          </View>

          {/*Register underline button */}
          <Button
              onPress={onPressRegister}
              marginTop={5}
              buttonType = "MULTI_TEXT_BUTTON"
              buttonText="Not Registered?"
              buttonSecText ={" Create an account"} />
        </View>
      </SafeAreaView>
    );
  }
}