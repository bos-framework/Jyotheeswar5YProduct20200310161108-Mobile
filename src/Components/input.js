
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import CommonStyles from '../Styles/commonStyles';
import Colors from '../Resources/colors';
import Fonts from '../Resources/fonts';

const Input = (props) => {

  if (props.inputType === "UNDER_LINE") {

    return <View style={[props.containerStyle, {borderWidth: 0, borderBottomWidth: 1,
      marginTop: 10}]}>
      {
        props.labelName != null ? <Text style={{fontFamily: Fonts.fontFamily}}>{props.labelName}</Text> : null
      }
      <TextInput
        autoCapitalize={props.capitalize}
        autoCorrect={false}
        maxLength={props.isPhoneNumberField ? 10: 50}
        editable={props.editable}
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        placeholderTextColor= {Colors.textInputPaceholderTextColor}
        returnKeyType={props.returnKeyType}
        style={[CommonStyles.textInputStyle, { backgroundColor: "transparent", paddingLeft: 0 }]}
        value={props.value}
        onChangeText={props.changeText}
        secureTextEntry={props.secureTextEntry}
        
      />
    </View>

  } else if (props.inputType = "BOX") {

    return <View style={props.containerStyle}>
      <TextInput
        autoCapitalize={props.capitalize}
        autoCorrect={false}
        editable={props.editable}
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        placeholderTextColor= {Colors.textInputPaceholderTextColor}
        returnKeyType={props.returnKeyType}
        style={CommonStyles.textInputStyle}
        value={props.value}
        onChangeText={props.changeText}
        secureTextEntry={props.secureTextEntry}
      />
    </View>

  }

}
export default Input;