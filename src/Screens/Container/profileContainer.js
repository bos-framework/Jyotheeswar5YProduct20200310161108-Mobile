import React, { Component } from "react";
import { Alert } from 'react-native';
import Profile from '../Presentational/profile';
import NetworkService from '../../Network/NetworkService';
import Strings from '../../Resources/strings';
import Helper from '../../Utilities/helper';
import { connect } from "react-redux";
import { saveUserDetails, logoutUser } from "../../actions";
import AppData from '../../store/AppData';
import NavigationService from '../../Navigator/NavigationService';

class ProfileContainer extends Component {

  constructor(props) {
    super(props);
  }

  // Initial state.
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: "",
    gender: "",
    errors: {
      firstNameEmpty: false,
      lastNameEmpty: false
    }
  };

  /*
    Load user details to display into the form from the Application state(Redux) if data exists, 
    otherwise get userId from the AsyncStorage(App local storage) and get userdetails from the Remote through API call.
  */
  componentDidMount() {
    Helper.isEmpty(this.props.userDetails) ? this.getUserProfileDetails(this.props.userId) : this.displayUserDetails(this.props.userDetails);
  }

  // Update user details to local state to render the form.
  displayUserDetails(userDetails) {

    this.setState({
      firstName: userDetails.FirstName,
      lastName: userDetails.hasOwnProperty('LastName') ? userDetails.LastName : '',
      email: userDetails.email,
      phoneNumber: userDetails.hasOwnProperty('phoneNumber') ? userDetails.phoneNumber : '',
      dateOfBirth: userDetails.hasOwnProperty('dateOfBirth') ? userDetails.dateOfBirth : '',
      gender: userDetails.hasOwnProperty('gender') ? userDetails.gender : '',
    })
    
  }

  // Get user profile details from server.
  getUserProfileDetails = (userId) => {
    
    NetworkService.getUserProfileDetails(userId, this.props.token).then(response => {
      if (response.ok) {
        response.json().then((responseJson) => {
          if (responseJson) {
            this.setState({
              firstName: responseJson.FirstName,
              lastName: responseJson.hasOwnProperty('LastName') ?
                responseJson.LastName :
                null,
              email: responseJson.email,
              phoneNumber: responseJson.hasOwnProperty('phoneNumber') ?
                responseJson.phoneNumber :
                null,
              dateOfBirth: responseJson.hasOwnProperty('dateOfBirth') ?
                responseJson.dateOfBirth :
                null,
              gender: responseJson.hasOwnProperty('gender') ?
                responseJson.gender :
                null
            });
          }
        })
      }
    }).catch(() => {
      alert(Strings.error.errorMessage)
    });

  }

  // OnChangetext in inputField update the state. 
  onChangeTextHandler = (name, errorKey, value) => {
    let error = this.state.errors;
    error[errorKey] = false;
    this.setState({ [name]: value, errors: error });
  }

  // Input fields validations. 
  validateFields() {

    const { firstName, lastName, errors } = this.state;

    errors.firstNameEmpty = firstName.length === 0 ? true : false;
    errors.lastNameEmpty = lastName.length === 0 ? true : false;

    this.setState({ errors })

    return Helper.validateForm(errors);
  }

  
  /* 
    On press the save button update the user details
    to server, local & Application state redux.
  */
  onPressSave = () => {

    // Parameters. 
    let params = {
      email: this.state.email.toLowerCase(),
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      dateOfBirth: this.state.dateOfBirth,
      gender: this.state.gender
    };

    // Stop here if form is invalid.
    if (!this.validateFields()) {
      return;
    }

    // API call to update profile details.
    NetworkService.updateUserProfile(this.props.userId, params, this.props.token).then(response => {
      if (response.ok) {
        response.json().then((responsejson) => {
          this.props.saveUserDetails(responsejson);
          this.alertMessage(Strings.success.profileUpdateSuccess, 200)
        })
      } else if (response.status === 401){
        this.alertMessage(Strings.error.sessionExpired, 401)
      } else {
        this.alertMessage(Strings.error.errorMessage, 500)
      }
    }).catch(() => {
      this.alertMessage(Strings.error.errorMessage, 500)
    });
  };

  navigateToAuth() {
    AppData.clearData(status => {
      if (status) {
        this.props.logoutUser();
        NavigationService.navigate('Auth');
      } else {
        alert('Something went wrong. Please try again!');
      }
    });
  }

  /* 
    Display alert message on response of the API call with Success or failure,
    stop loader/spinner and Navigate to Home/App screen
  */
 alertMessage(message, statusCode) {
  Alert.alert(message, "", [
    {
      text: "OK",
      onPress: () => {
        if (statusCode === 401) this.navigateToAuth();
      }
    }
  ]);
}


  // Render.
  render() {
    return (
      <Profile
        data={this.state}
        onChangeTextHandler={this.onChangeTextHandler}
        onSaveBtnTapped={this.onPressSave} />
    );
  }
}

const mapStateToProps = state => {
  let { token ,userDetails, userId } = state.user;
  return { token, userDetails, userId };
};

export default connect(mapStateToProps, { saveUserDetails, logoutUser })(ProfileContainer);