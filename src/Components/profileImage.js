import React from 'react';
import { Image } from 'react-native';

const ProfileImage = ({ imagePath, styles }) => {
    return <Image
        style={styles}
        resizeMode="contain"
        source={imagePath}
    />
}
export default ProfileImage;
