
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import BottomTabBar from "react-navigation-selective-tab-bar";
import Constants from '../Resources/constants';
import Colors from '../Resources/colors';

export default class DynamicTabNavigator extends Component {

    state = {
        tabs: [],
    };

    componentDidMount = () => {
        this.getTabs();
    };

    // Retrive Modules for user stored in app local storage.
    retrieveModules = async (callback) => {
        try {
            const result = await AsyncStorage.getItem(Constants.MODULES);
            if (result !== null) {
                let modules = JSON.parse(result);
                var m = []
                for (let i = 0; i < modules.modules.length; i++) {
                    const element = modules.modules[i];
                    m.push(element.name)
                }
                console.log(m);

                callback(m)
            }
        } catch (error) {
            callback(error.message);
        }
    };

    getTabs = () => {

        const tabs = [];

        // Add componets to tabs array
        this.retrieveModules((modules) => {
            modules.forEach(function (name) {
                if (name === "Chat") {
                    tabs.push('Chat');
                } else if (name === "Classes") {
                    tabs.push('Classes');
                } else if (name === "Learn") {
                    tabs.push('Learn');
                } else if (name === "Reminder") {
                    tabs.push('Reminder');
                } else if (name === "School") {
                    tabs.push('School');
                } else if (name === "Status") {
                    tabs.push('Status');
                } else if (name === "Tests") {
                    tabs.push('Test');
                } else if (name === "Profile") {
                    tabs.push('Profile');
                }
            });
            this.setState({
                tabs,
            });
        })

    }

    render = () => {
        return (
            <BottomTabBar {...this.props} display={this.state.tabs} background={Colors.primaryAppThemeColor} />
        );
    };
}