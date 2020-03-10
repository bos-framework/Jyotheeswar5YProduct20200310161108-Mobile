import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
} from 'react-native';
import Input from '../../Components/input';
import Helper from '../../Utilities/helper';
import Button from '../../Components/button';
import CommonStyles from '../../Styles/commonStyles';

export default class ChangePassword extends Component {

    render() {

        const { 
            data, 
            onChangeTextHandler, 
            onSaveBtnTapped } = this.props;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={CommonStyles.container}>
                    <View style={[CommonStyles.formContainer, {marginTop: 50}]}>
                        <Input
                            containerStyle={CommonStyles.inputBorder}
                            secureTextEntry={true}
                            inputType="UNDER_LINE"
                            labelName="Current password"
                            keyboardType="default"
                            capitalize="none"
                            placeholder="Current password"
                            returnKeyType="next"
                            value={data.currentPassword}
                            changeText={(value) => onChangeTextHandler("currentPassword", "currentPasswordEmpty", null, value)} />
                        {Helper.errorMessage(data.errors.currentPasswordEmpty, "Current password cannot be empty.")}

                        <Input
                            containerStyle={CommonStyles.inputBorder}
                            secureTextEntry={true}
                            inputType="UNDER_LINE"
                            labelName="New password"
                            keyboardType="default"
                            capitalize="none"
                            placeholder="New password"
                            returnKeyType="next"
                            value={data.newPassword}
                            changeText={(value) => onChangeTextHandler("newPassword", "newPasswordError", null, value)} />
                        {Helper.errorMessage(data.errors.newPasswordError, "The Password must contain atleast one upper case, one lower case, one numeric and one special character(!@.,#$%^&*).")}

                        <Input
                            containerStyle={CommonStyles.inputBorder}
                            secureTextEntry={true}
                            inputType="UNDER_LINE"
                            labelName="Confirm new password"
                            keyboardType="default"
                            capitalize="none"
                            placeholder="Confirm new password"
                            returnKeyType="done"
                            value={data.confirmNewPasword}
                            changeText={(value) => onChangeTextHandler("confirmNewPasword", "confirmNewPaswordError", "passwordNotMatches", value)} />
                        {Helper.errorMessage(data.errors.passwordNotMatches, "Passwords do not match.")}

                        <Button
                            onPress={onSaveBtnTapped}
                            buttonType= "BG-BUTTON"
                            marginTop={20}
                            buttonText="Save" />
                    </View>
                </View>
            </SafeAreaView >
        );
    }
}

