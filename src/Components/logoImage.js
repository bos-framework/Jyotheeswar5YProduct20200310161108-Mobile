import React from 'react';
import { Image } from 'react-native';
import CommonStyles from '../Styles/commonStyles';

const LogoImage = (props) => {
    return <Image
        styles={CommonStyles.logo}
        style={{width: 160, height: 74}}
        resizeMode="contain"
        source={props.imagePath}
    />
}
export default LogoImage;
