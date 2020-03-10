import { createStackNavigator } from 'react-navigation';
import OnBoardingScreen from '../Screens/Container/onBoardingConatiner';
import LoginScreen from '../Screens/Container/loginContainer';
import SignupScreen from '../Screens/Container/signUpContainer';
import ForgotPasswordScreen from '../Screens/Container/forgotPasswordContainer';

const AuthNavigator = createStackNavigator({
  
  /*
  OnBoarding: {
    screen: OnBoardingScreen,
    navigationOptions: {
      header: null,
    }
  },
  */
  SignIn: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: 'Login',
    }),
  },
  SignUp: {
    screen: SignupScreen,
    navigationOptions: () => ({
      title: 'Register',
    }),
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen,
    navigationOptions: () => ({
      title: 'Forgot Password',
    }),
  }
},{
  defaultNavigationOptions: {
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#fff',
    },
  }
});

export default AuthNavigator;
