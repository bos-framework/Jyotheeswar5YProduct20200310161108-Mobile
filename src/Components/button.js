import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import CommonStyles from '../Styles/commonStyles';
import Fonts from '../Resources/fonts';
import colors from '../Resources/colors';
import margins from '../Resources/margins';

/* 
Custom button.
*/
const Button = props => {
    if (props.buttonType === "BG-BUTTON") {
        return <TouchableOpacity
            onPress={props.onPress}
            style={[CommonStyles.btnStyle, { marginTop: props.marginTop > 0 ? props.marginTop : margins.PRIMARY_MARGIN }]}>
            <Text style={CommonStyles.buttonText}>{props.buttonText}</Text>
        </TouchableOpacity>
    } else if (props.buttonType === "MULTI_TEXT_BUTTON") {
        return <TouchableOpacity
            onPress={props.onPress}
            style={[CommonStyles.btnStyle, { marginTop: props.marginTop > 0 ? props.marginTop : margins.PRIMARY_MARGIN, backgroundColor: colors.secondaryButtonColor }]}>
            <Text style={[CommonStyles.buttonText, { color: colors.secondaryButtonTextColor, fontSize: Fonts.FONT_SIZE_N }]}>{props.buttonText}<Text style={[CommonStyles.buttonText, { fontWeight: Fonts.FONT_WEIGHT, color: Fonts.secondaryButtonTextColor, fontSize: Fonts.FONT_SIZE_N }]}> {props.buttonSecText}</Text></Text>
        </TouchableOpacity>
    } else {
        return <TouchableOpacity
            onPress={props.onPress}
            style={[CommonStyles.btnStyle, { marginTop: props.marginTop > 0 ? props.marginTop : margins.PRIMARY_MARGIN, backgroundColor: colors.secondaryButtonColor }]}>
            <Text style={[CommonStyles.buttonText, { color: colors.secondaryButtonTextColor, fontFamily: Fonts.fontFamily, fontSize: Fonts.FONT_SIZE_N }]}>{props.buttonText}</Text>
        </TouchableOpacity>
    }

}
export default Button;

