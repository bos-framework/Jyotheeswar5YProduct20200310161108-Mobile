import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import commonStyles from '../Styles/commonStyles';

export default class Header extends React.Component {
    render() {
        const navigation = this.props.navigation;
        return (
            <View style={styles.headerView}>
                <View style={{ flex: 0.2 }}>
                   <TouchableOpacity onPress={() => navigation.goBack()}>
                       <Image source={require('../../../Assets/Profile/left-arrow.png')} />
                       </TouchableOpacity>
                </View>
                <View style={styles.imageView}>
                    <Image source={require('../../../Assets/logo-purple.png')} style={commonStyles.logo} />
                </View>
                <View style={{ flex: 0.2 }} />
            </View>
        )
    }   
}
const styles = StyleSheet.create({
    headerView: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageView: {
       flex: 0.6,
       justifyContent: 'center',
       alignItems: 'center'
    }
})