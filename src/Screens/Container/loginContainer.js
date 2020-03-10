/**
 * Login Container implementation
 * @class LoginContainer
 */

import React, { Component } from 'react';
import { Alert } from 'react-native';
import Constants from '../../Resources/constants';
import Strings from '../../Resources/strings';
import Helper from '../../Utilities/helper';
import Login from '../Presentational/login';
import { connect } from "react-redux";
import { saveUserId, saveUserDetails, saveToken } from "../../actions";
import NetworkService from '../../Network/NetworkService';
import AppData from '../../store/AppData';


class LoginContainer extends Component {

  // Initial state
  state = {
    email: '',
    password: '',
    errors: {
      emailEmpty: false,
      emailError: false,
      passwordEmpty: false,
      passwordError: false,
    },
    isLoading: false,
  };

  constructor(props) {

    super(props);

    // Binding all the button and input fields 
    this.onPressLogin = this.onPressLogin.bind(this);
    this.onPressForgotpassword = this.onPressForgotpassword.bind(this);
    this.onPressRegister = this.onPressRegister.bind(this);
  }

  getToken = () => {
    
    // Start loader/spinner before API call
    this.setState({ isLoading: true });

    // Get Access Token 
    NetworkService.getToken()
      .then(response => {
        if (response.ok) {
          response.json().then(responsejson => {
            this.setState({isLoading: false});
            AppData.setItemForKey(
              Constants.TOKEN,
              'Bearer '+ responsejson.token,
              status => {
                if (status) {
                  this.props.saveToken('Bearer '+ responsejson.token)
                } else{
                  alert(Strings.error.token);
                }
              },
            );
          });
        } else {
          this.alertMessage(Strings.error.errorMessage);
        }
      })
      .catch(() => {
        this.alertMessage(Strings.error.errorMessage);
      });
  }

  UNSAFE_componentWillMount() {
    this.getToken()
  }

  // Login button action
  onPressLogin = () => {

    // Get the roleId passed from the OnBoarding Screen, with user selected type of login
    //let roleId = this.props.navigation.getParam('roleId', '');

    // Stop here if form is invalid or roleId is empty.
    // if (!this.validateFields() || Helper.isEmpty(roleId)) {
    //   return;
    // }

    if (!this.validateFields() || this.props.token === null) {
      return;
    }

    // parameters
    let params = {
      username: this.state.email.trim(),
      password: this.state.password,
    };

    // Start loader/spinner before API call
    this.setState({ isLoading: true });

    // API call to login into the system without roles, permissions and operations.
    // NetworkService.login(params).then(response => {
    //   if (response.ok) {
    //     response.json().then((responsejson) => {
    //       // Get user role details with userId to compare with user selected login type..
    //       this.getUserRole(responsejson.userId, roleId)
    //       this.getUserProfileDetails(responsejson.userId)
    //     })
    //   } else if (response.status === 403) {
    //     this.alertMessage(Strings.error.accountDeactivated);
    //   } else if (response.status === 400 || response.status === 404) {
    //     this.alertMessage(Strings.success.invalidCredientials);
    //   } else {
    //     this.alertMessage(Strings.error.errorMessage);
    //   }
    // }).catch(() => {
    //   this.alertMessage(Strings.error.errorMessage);
    // })
    
     // Login Api call for normal user
     NetworkService.login(params, this.props.token).then(response => {
      if (response.ok) {
        this.setState({ isLoading: false });
        response.json().then((responsejson) => {
          this.storeUserData(responsejson.userId)
        })
      } else if (response.status === 403) { 
        this.alertMessage(Strings.error.accountDeactivated);
      } else if (response.status === 400 || response.status === 404) {
        this.alertMessage(Strings.success.invalidCredientials);
      } else {
        this.alertMessage(Strings.error.errorMessage);
      }
    }).catch(() => {
      this.alertMessage(Strings.error.errorMessage);
    })
  };

  // Get user role with logged-in userId.
  getUserRole(userId, roleId) {

    NetworkService.getUserRoleWithUserId(userId, this.props.token).then(response => {
      if (response.ok) {
        response.json().then((responsejson) => {
          let userRoleId = responsejson.value[0].roles[0].roleId;
          // If logged-in user roleId is same with user selecte login type role.
          if (roleId === userRoleId) {
            // Call API to get modules for logged-In user.
            this.getModulesAssignedForUser(userId)
          } else {
            // Alert if user try to login with other role based user type.
            this.alertMessage(Strings.success.invalidCredientials);
          }
        })
      } else {
        this.alertMessage(Strings.error.errorMessage);
      }
    }).catch(() => {
      this.alertMessage(Strings.error.errorMessage);
    })

  }

  // Get all modules assigned to user.
  getModulesAssignedForUser(userId) {

    NetworkService.getModulesAssignedForUser(userId, this.props.token).then(response => {
      if (response.ok) {
        this.setState({ isLoading: false });
        response.json().then((responsejson) => {
          this.storeUserData(userId)
          this.storeModulesData(responsejson)
        })
      } else {
        this.alertMessage(Strings.error.errorMessage)
      }
    }).catch(() => {
      this.alertMessage(Strings.error.errorMessage)
    })

  }

  // Get user profile details from server.
  getUserProfileDetails = (userId) => {
   
    NetworkService.getUserProfileDetails(userId, this.props.token).then(response => {
      if (response.ok) {
        response.json().then((responseJson) => {
          if (responseJson) {
            this.props.saveUserDetails(responseJson);
          }
        })
      }
    }).catch(() => {
      alert(Strings.error.errorMessage)
    });

  }

  // Store user info into App local storage.
  async storeUserData(userId) {
    
    AppData.setItemForKey(Constants.USERID, userId, (status) => {
      if (status) {
        // Save userId 
        this.props.saveUserId(userId);
        this.props.navigation.navigate('AppLoading');
      } else {
        alert(Strings.error.errorMessage);
      }
    });

  };

  // Store module data for corresponding role based user.
  async storeModulesData(modulesData) {
    AppData.setItemForKey(Constants.MODULES, JSON.stringify(modulesData), (status) => {
      if (status) {
        this.props.navigation.navigate('App');
      } else {
        alert(Strings.error.errorMessage);
      }
    });
  };

  // Forgot password button action.
  onPressForgotpassword = () => {
    this.resetValues();
    this.props.navigation.navigate('ForgotPassword');
  };

  // Create Account button action.
  onPressRegister = () => {
    this.resetValues();
    this.props.navigation.navigate('SignUp');
  };

  // Update state properties with onChangeText for every Inputfield. Change the error status message.
  onChangeTextHandler = (name, fErrorKey, sErrorKey, value) => {
  
    let error = this.state.errors;
    error[fErrorKey] = false;
    if (sErrorKey != null) {
      error[sErrorKey] = false
    }
    this.setState({ [name]: value, errors: error });
  }

  // Reset Inputfields.
  resetValues() {
    let errors = this.state.errors;
    Object.keys(errors).map(key => {
      errors[key] = false;
    });
    this.setState({ email: '', password: '', errors });
  }

  // Input fields validations. 
  validateFields() {

    const { email, password, errors } = this.state;

    errors.emailEmpty = email.length === 0 ? true : false;
    errors.emailError = Helper.isEmailValid(email);
    errors.passwordEmpty = password.trim().length > 0 ? false : true;
    this.setState({ errors })

    return Helper.validateForm(errors);
  }

  alertMessage(message) {
    Alert.alert("Alert", message, [
      {
        text: "OK",
        onPress: () => {
          this.setState({ isLoading: false })
        }
      }
    ]);
  }

  render() {
    return (
      <Login
        data={this.state}
        isLoading={this.state.isLoading}
        onPressLogin={this.onPressLogin}
        onPressForgotpassword={this.onPressForgotpassword}
        onPressRegister={this.onPressRegister}
        onChangeTextHandler={this.onChangeTextHandler}
      />
    );
  }
}

const mapStateToProps = state => {
  let { token } = state.user;
  return { token };
};

export default connect(mapStateToProps, { saveToken, saveUserId, saveUserDetails })(LoginContainer);
