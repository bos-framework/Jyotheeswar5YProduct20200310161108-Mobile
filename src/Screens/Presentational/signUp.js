import React, { Component } from 'react';
import {
    View,
    Platform,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView
} from 'react-native';
import Input from '../../Components/input';
import Helper from '../../Utilities/helper';
import LogoImage from '../../Components/logoImage';
import CommonStyles from '../../Styles/commonStyles';
import Button from '../../Components/button';
import Loader from "../../Utilities/loader";
import Colors from '../../Resources/colors';

export default class Login extends Component {

    render() {

        const {
            isLoading,
            data,
            onChangeTextHandler,
            onPressSubmit } = this.props;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={CommonStyles.container}>

                    {/* Loader control */}
                    <Loader loading={isLoading} />

                    {/* You can replace your logo and resize your logo container */}
                    <View style={CommonStyles.logoContainer}>
                        <LogoImage imagePath={require('../../Assets/Images/logo.png')} />
                    </View>

                    {/* Form input fields */}
                    <KeyboardAvoidingView
                        style={CommonStyles.formContainer}
                        behavior={Platform.OS === "ios" ? "padding" : null}
                        enabled
                        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>

                        <ScrollView showsVerticalScrollIndicator = {false}>

                            <Input
                                containerStyle={[
                                    CommonStyles.inputBorder,
                                    data.errors.firstNameError ?
                                        { borderColor: Colors.errorColor }
                                        : { borderColor: Colors.borderColor }
                                ]}
                                secureTextEntry={false}
                                capitalize="sentences"
                                keyboardType="default"
                                placeholder="First Name"
                                returnKeyType="next"
                                value={data.firstName}
                                changeText={(value) => onChangeTextHandler("firstName", "firstNameError", null, value)} />
                            {Helper.errorMessage(data.errors.firstNameError, "First name is required.")}

                            <Input
                                containerStyle={[
                                    CommonStyles.inputBorder,
                                    data.errors.lastNameError ?
                                        { borderColor: Colors.errorColor }
                                        : { borderColor: Colors.borderColor }
                                ]}
                                secureTextEntry={false}
                                capitalize="sentences"
                                keyboardType="default"
                                placeholder="Last Name"
                                returnKeyType="next"
                                value={data.lastName}
                                changeText={(value) => onChangeTextHandler("lastName", "lastNameError", null, value)} />
                            {Helper.errorMessage(data.errors.lastNameError, "Last name is required.")}

                            <Input
                                containerStyle={[
                                    CommonStyles.inputBorder,
                                    data.errors.emailError ?
                                        { borderColor: Colors.errorColor }
                                        : { borderColor: Colors.borderColor }
                                ]}
                                secureTextEntry={false}
                                capitalize="none"
                                keyboardType="email-address"
                                placeholder="Email"
                                returnKeyType="next"
                                value={data.email}
                                changeText={(value) => onChangeTextHandler("email", "emailError", "emailEmpty", value)} />
                            {data.errors.emailEmpty ?
                                Helper.errorMessage(data.errors.emailEmpty, "Email Id is required.") :
                                Helper.errorMessage(data.errors.emailError, "Email is not valid.")}

                            <Input
                                containerStyle={[
                                    CommonStyles.inputBorder,
                                    data.errors.confirmEmailEmpty || data.errors.emailNotMatched ?
                                        { borderColor: Colors.errorColor }
                                        : { borderColor: Colors.borderColor }
                                ]}
                                secureTextEntry={false}
                                capitalize="none"
                                keyboardType="email-address"
                                placeholder="Re-enter your email"
                                returnKeyType="next"
                                value={data.confirmEmail}
                                changeText={(value) => onChangeTextHandler("confirmEmail", "confirmEmailEmpty", "emailNotMatched", value)} />
                            {data.errors.confirmEmailEmpty ?
                                Helper.errorMessage(data.errors.confirmEmailEmpty, "Email Id is required.") :
                                Helper.errorMessage(data.errors.emailNotMatched, "Emails do not match.")}

                            <Input
                                containerStyle={[
                                    CommonStyles.inputBorder,
                                    data.errors.passwordError ?
                                        { borderColor: Colors.errorColor }
                                        : { borderColor: Colors.borderColor }
                                ]}
                                secureTextEntry={true}
                                capitalize="none"
                                keyboardType="default"
                                placeholder="Password"
                                returnKeyType="next"
                                value={data.password}
                                changeText={(value) => onChangeTextHandler("password", "passwordError", null, value)} />
                            {Helper.errorMessage(data.errors.passwordError, "The Password must contain atleast one upper case, one lower case, one numeric and one special character(!@.,#$%^&*).")}

                            <Input
                                containerStyle={[
                                    CommonStyles.inputBorder,
                                    data.errors.confirmPasswordEmpty || data.errors.passwordNotMatched ?
                                        { borderColor: Colors.errorColor }
                                        : { borderColor: Colors.borderColor }
                                ]}
                                secureTextEntry={true}
                                capitalize="none"
                                keyboardType="default"
                                placeholder="Re-enter Password"
                                returnKeyType="done"
                                value={data.confirmPassword}
                                changeText={(value) => onChangeTextHandler("confirmPassword", "confirmPasswordEmpty", "passwordNotMatched", value)} />

                            {data.errors.confirmPasswordEmpty ?
                                Helper.errorMessage(data.errors.confirmPasswordEmpty, "Re-enter password is required.") :
                                Helper.errorMessage(data.errors.passwordNotMatched, "Passwords do not match.")}

                            {/*Register button */}
                            <Button
                                onPress={onPressSubmit}
                                buttonType= "BG-BUTTON"
                                marginTop={20}
                                buttonText="Submit" />
                        </ScrollView>

                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView >
        );
    }
}