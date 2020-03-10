import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView
} from 'react-native';
import CardView from '../../Components/CardView';
import Loader from "../../Utilities/loader";
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');
const sliderHeight = 300;
const padding = 100;

export default class OnBoard extends Component {

  render() {

    const {
      isLoading,
      userTypes,
      onSignUpPress,
      onLoginPress } = this.props;

    return (

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Loader loading={isLoading} />
          <Carousel
            ref={(c) => { this._carousel = c }}
            data={userTypes}
            contentContainerCustomStyle={styles.contentContainer}
            renderItem={({ item, index }) => {
              return <CardView
                index={index}
                item={item}
                name={index === 0 ? "Student Sign Up" :
                  index === 1 ? "Teacher Sign Up" :
                    "Parent Sign Up"}
                signUpPress={onSignUpPress}
                loginPress={onLoginPress} />;
            }}
            sliderWidth={width}
            sliderHeight={sliderHeight}
            itemWidth={width - padding}
            activeSlideAlignment={'center'}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});