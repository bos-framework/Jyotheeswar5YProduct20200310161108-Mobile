import React, { Component } from "react";
import {
    Alert,
} from 'react-native';
import AppData from '../../store/AppData';
import Constants from '../../Resources/constants';
import Strings from '../../Resources/strings';
import NetworkService from '../../Network/NetworkService';
import Helper from '../../Utilities/helper';
import OnBoard from '../Presentational/onBoard';
import Colors from '../../Resources/colors';

// Roles 
// Replace roles and colors.
const userTypes = [
    {
        id: 0,
        color: Colors.secondaryAppThemeColor,
        type: "STUDENT"
    },
    {
        id: 1,
        color: Colors.secondaryAppThemeColor,
        type: "TEACHER"
    },
    {
        id: 2,
        color: Colors.secondaryAppThemeColor,
        type: "PARENT"
    }
]
class OnBoardingContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userTypes: userTypes,
            isLoading: false,
            roles: []
        };
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getRoles();
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    // Fetch roles if already store in App local storage 
    getRoles = () => {
        Helper.getRolesFromls(Constants.ROLES, (status, roles) => {
            if (status) {
                this.setState({ roles: roles })
            } else {
                // Api call to Fetch the roles from server.
                this.fetchRoles();
            }
        })
    }
     
    // Fetch all the roles created in BOS Console for project/App.
    // Add/remove the existing roles in BOS console for project according to business logic.
    fetchRoles() {
        this.setState({ isLoading: true });
        NetworkService.getAllRoles().then(response => {
            if (response.ok) {
                this.setState({ isLoading: false });
                response.json().then((responsejson) => {
                    if (responsejson.value) {
                        this.storeRoles(responsejson.value);
                    }
                });
            } else {
                this.alertMessage(Strings.error.errorMessage)
            }
        }).catch(() => {
            this.alertMessage(Strings.error.errorMessage)
        })
    }

    // Store roles into App local storage
    async storeRoles(roles) {
        AppData.setItemForKey(Constants.ROLES, JSON.stringify(roles), (status) => {
            if (status) {
                this.setState({ roles: roles })
            } else {
                alert(Strings.error.errorMessage);
            }
        });
    };

    // Get userRoleId for selected user type login 
    getUserRoleId(item) {
        var filteredItems = this.state.roles.filter(function (itm) {
            return itm.name == item.type;
        });
        let roleId = filteredItems[0].id;
        return roleId;
    }

    // Navigation to login screen
    onLoginPress = (item, index) => {

        // Checking the component state roles param. is empty
        if (Helper.isEmpty(this.getUserRoleId(item))) {
            // If failed to fetch the roles on mount of component.
            // Calling fetchRoles function to call API.
            this.fetchRoles();
            return;
        }

        // If data avaliable get the roleId 
        let roleId = this.getUserRoleId(item);

        // Navigate to login screen with user selected role based login.
        index === 0 ? this.navigation("SignIn", { userType: "STUDENT", roleId: roleId }) : 
        index === 1 ? this.navigation("SignIn", { userType: "TEACHER", roleId: roleId }) : 
        this.navigation("SignIn", { userType: "PARENT", roleId: roleId })

    }

    // Navigation to signup screen
    onSignUpPress = (index) => {
        index === 0 ? this.navigation("SignUp", { userType: "STUDENT" }) : 
        index === 1 ? this.navigation("SignUp", { userType: "TEACHER" }) : 
        this.navigation("SignUp", { userType: "PARENT" })
    }

    // Navigation 
    navigation = (screen, params) => {
        this.props.navigation.navigate(screen, params)
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

    // Render
    render() {
        return (
            <OnBoard
                isLoading={this.state.isLoading}
                userTypes={this.state.userTypes}
                onSignUpPress={this.onSignUpPress}
                onLoginPress={this.onLoginPress}
            />
        );
    }
}

export default OnBoardingContainer;