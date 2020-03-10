import React, { Component } from 'react';
import { Alert } from 'react-native';
import Helper from '../../Utilities/helper';
import Signup from '../Presentational/signUp';
import Constants from '../../Resources/constants';
import NetworkService from '../../Network/NetworkService';
import Strings from '../../Resources/strings';
import { connect } from "react-redux";

class SignUpContainer extends Component {

  constructor(props) {
    super(props);
    this.onPressSubmit = this.onPressSubmit.bind(this);
  }

  // Initial state
  state = {
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    errors: {
      firstNameError: false,
      lastNameError: false,
      emailEmpty: false,
      emailError: false,
      confirmEmailEmpty: false,
      passwordError: false,
      confirmPasswordEmpty: false,
      emailNotMatched: false,
      passwordNotMatched: false,
    },
    isLoading: false,
  };

  // Form input fields validations
  validateFields() {

    const {
      firstName,
      lastName,
      email,
      confirmEmail,
      password,
      confirmPassword,
      errors
    } = this.state;

    errors.firstNameError = firstName.trim().length > 0 ? false : true;
    errors.lastNameError = lastName.trim().length > 0 ? false : true;
    errors.emailEmpty = email.length === 0 ? true : false;
    errors.emailError = Helper.isEmailValid(email);
    errors.confirmEmailEmpty = confirmEmail.length === 0 ? true : false;
    errors.passwordError = Helper.isPasswordValid(password);
    errors.confirmPasswordEmpty = confirmPassword.trim().length === 0 ? true : false;
    errors.emailNotMatched = email != confirmEmail ? true : false;
    errors.passwordNotMatched = password != confirmPassword ? true : false;

    // Set state with error status. 
    this.setState({ errors })

    // Checking the form with empty field validation.
    return Helper.validateForm(errors);
  }

  // Submit btuon action.
  onPressSubmit = () => {

    // stop here if form is invalid. 
    if (!this.validateFields()) {
      return;
    }

    // Params to register a user.
    let params = {
      userName: this.state.email.toLowerCase(),
      email: this.state.email.toLowerCase(),
      password: this.state.password,
      extensions: {
        FirstName: this.state.firstName,
        LastName: this.state.lastName,
      }
    };

    // Start loader/spinner before API call.
    this.setState({ isLoading: true });

    // API call.
    NetworkService.signUp(params, this.props.token).then(response => {
      if (response.ok) {
        this.setState({ isLoading: false });
        response.json().then((responseJson) => { 
          // Assign a role to register user.
          // this.assignRoleToUser(responseJson.id);

          // Normal user without assign any roles.
          this.props.navigation.navigate('SignIn');
        })
      } else if (response.status === 409) {
        // User already exists
        this.alertMessage(Strings.error.userExists)
      } else {
        this.alertMessage(Strings.error.errorMessage)
      }
    }).catch(() => {
      this.alertMessage(Strings.error.errorMessage)
    })
  };

  // Assign a role to user.
  assignRoleToUser(userId) {

    // Get the userType(type of user login teacher/student/parent) passed from the OnBoarding screen.
    let userRole = this.props.navigation.getParam('userType', '');

    // Check userRole is empty.
    if (Helper.isEmpty(userRole)) {
      this.alertMessage(Strings.error.errorMessage)
    }

    // Get RoleId for rolename which is passed from the OnBoarding screen.
    Helper.getRoleIdForRoleName(Constants.ROLES, userRole, (status, roleId) => {

      // Success.
      if (status) {

        // Create a params to pass on the API request.
        let params = {
          roles: roleId
        };

        // API call.
        NetworkService.assignRoleToUser(userId, params, this.props.token).then(response => {
          this.setState({ isLoading: false });
          if (response.ok) {
            //On success of user register, navigate to Onboard screen to login user into App.
            this.props.navigation.navigate('OnBoarding');
          } else {
            this.alertMessage(Strings.error.errorMessage)
          }
        }).catch(() => {
          this.alertMessage(Strings.error.errorMessage)
        })
      } else {
        // Failur, Display error message.
        this.alertMessage(Strings.error.errorMessage)
      }
    })
  }

  // Display Alert Message on success or failure with API calls by passing "Message". And stop spinner.
  alertMessage(message) {
    Alert.alert("Alert", message, [
      {
        text: "OK",
        onPress: () => {
          this.setState({ isLoading: false });
        }
      }
    ]);
  }

  // Update state properties with onChangeText for every Inputfield. Changing the Error status message.
  onChangeTextHandler = (name, fErrorKey, sErrorKey, value) => {
    let error = this.state.errors;
    error[fErrorKey] = false;
    if (sErrorKey != null) {
      error[sErrorKey] = false
    }
    this.setState({ [name]: value, errors: error });
  }

  // Render component. 
  render() {
    return (
      <Signup
        data={this.state}
        onPressSubmit={this.onPressSubmit}
        onChangeTextHandler={this.onChangeTextHandler}
        isLoading={this.state.isLoading}
      />
    );
  }
}

const mapStateToProps = state => {
  let { token } = state.user;
  return { token };
};

export default connect(mapStateToProps, null)(SignUpContainer);


