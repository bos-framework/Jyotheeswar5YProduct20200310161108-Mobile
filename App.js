/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { Provider } from "react-redux";
import Remote from './src/Config/remote';
import store from './src/store/store';

import Constants from './src/Resources/constants';
import NetworkService from './src/Network/NetworkService';
import NavigationService from './src/Navigator/NavigationService';

// App root navigator stacks to switch based on the login status.
import AuthStackNavigator from './src/Navigator/AuthNavigator';
import AppStackNavigator from './src/Navigator/AppNavigator';
import AppLoadingScreen from './src/Navigator/AppLoading';


/*
*Use AppLoadingScreen component in Root Navigator, if app requires role based login with permisions and operations.
*Remove this component/use only Auth and App stackNavigator for normal user login without roles, permissions and operations.
*/
const getRootNavigator = LoggedIn =>

  createSwitchNavigator({
    AppLoading: AppLoadingScreen,
    Auth: AuthStackNavigator,
    App: AppStackNavigator
  },
    {
      initialRouteName: LoggedIn ? "AppLoading" : "Auth"
    }
  );


export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: null  // initially set isLoggedIn value with null.
    };
    this.configuration();
    this._bootstrap();
  }

  configuration() {

    try {
      NetworkService.configuration(options = {
        baseUrl: Remote.BASE_URL,
        bundleId: Remote.BUNDLEID,
        clientId: Remote.CLIENTID,
        clientSecret: Remote.CLIENTSECRET
      }).catch(e => {
        alert(e);
      });
    }
    catch (e) {
      alert(e);
    }
  }

  /* 
    To check if user already logged In. 
    If userId exists in App local storage (AsyncStorage) update to component state with status.
  */
  _bootstrap = async () => {

    try {
      AsyncStorage.getItem(Constants.USERID).then((userId) => {
        this.setState({
          isLoggedIn: userId != null
        })
      });
    } catch (error) {
      this.setState({ isLoggedIn: false })
    }
  }

  render() {

    if (this.state.isLoggedIn != null) {

      // Get a root navigation based on the stauts of isLoggedIn property in state
      // If it is isLoggedIn = true -> Navigated to App
      // If it is isLoggedIn = false -> Navigated to Auth(Login)

      const rootNavigator = getRootNavigator(this.state.isLoggedIn);
      const AppContainer = createAppContainer(rootNavigator);

      return (<Provider store={store}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }} />
      </Provider>);
    } else {
      {/* Render a loader/sipnner component with initial render */ }
      return (<View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});