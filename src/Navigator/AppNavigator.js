import React from 'react';
import { createBottomTabNavigator, createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Constants from '../Resources/constants';
import Weblinks from '../SideMenu/webLinks';

// DrawerNavigator components
import DrawerScreen from "../SideMenu/drawer";
import NavigationDrawerStructure from '../SideMenu/NavigationDrawerStructure';
import ChangePassword from '../Screens/Container/changePasswordContainer';

// Component to creat DynamicTabs
import DynamicTabNavigator from "./DynamicTabNavigator";


// Module components/Screens 
// Replace components to your logic.

import Profile from '../Screens/Container/profileContainer';
import Chat from '../Screens/Modules/Chat';
import Classes from '../Screens/Modules/Classes';
import Learn from '../Screens/Modules/Learn';
import Notification from '../Screens/Modules/Notification';
import Reminder from '../Screens/Modules/Reminder';
import School from '../Screens/Modules/School';
import Status from '../Screens/Modules/Status';
import Test from '../Screens/Modules/Test';
import Details from '../Screens/Modules/Details';
import Fonts from '../Resources/fonts';


import Home from '../Screens/Container/HomeConatiner';

/*

Below are the Roles & Modules created in the BOS Console for App/Project.
We can add/remove the modules with respect to your bussiness logic or rename the existing module names
in console and add/rename the components in the App/Project.
Create Modules stack and components/screens in the project/App with names which are created in BOS Console for mobile project.
Example: Chat/Learn/school -> modules created in BOS Console.
 
Roles:
1. Parent
2. Student
3. Teacher
   
1.Parent modules/Sub-modules
       Chat -> Teacher, child.
       School -> Bus tracking, holidays, exam time table
       Status -> Subjects, Attandencs, assginments
       Notifications ->
2.Teacher modules/Sub-modules
       Chat -> Parents, students.
       Reminder -> Add task, to-do's
       Classes -> Timetable, Attendances
       Notifications -> Upcoming assignments, tests
3.Student modules/Sub-modules
       Learn -> subjects, topics
       Chat -> Teacher, parents
       School -> holidays, exam time table
       Tests -> Timed test, subject
*/

/*

// Modules stacks
// Bottomtabs stack. we can move each stack/module into seperate file, when the components increases in stack.
const ChatStack = createStackNavigator({
    ChatScreen: {
        screen: Chat,
        navigationOptions: ({ navigation }) => ({
            title: 'Chat',
            headerRight: <NavigationDrawerStructure navigationProps={navigation} />
        })
    },
    DetailsScreen: {
        screen: Details
    }
});

const ClassesStack = createStackNavigator({
    ClassesScreen: {
        screen: Classes,
        navigationOptions: ({ navigation }) => ({
            title: 'Classes',
            headerRight: <NavigationDrawerStructure navigationProps={navigation} />
        })
    },
    DetailsScreen: {
        screen: Details
    }
});

const LearnStack = createStackNavigator({
    LearnScreen: {
        screen: Learn,
        navigationOptions: ({ navigation }) => ({
            title: 'Learn',
            headerRight: <NavigationDrawerStructure navigationProps={navigation} />
        })
    },
    DetailsScreen: {
        screen: Details
    }
});

const ReminderStack = createStackNavigator({
    ReminderScreen: {
        screen: Reminder,
        navigationOptions: ({ navigation }) => ({
            title: 'Reminder',
            headerRight: <NavigationDrawerStructure navigationProps={navigation} />
        })
    },
    DetailsScreen: {
        screen: Details
    }
});

const SchoolStack = createStackNavigator({
    SchoolScreen: {
        screen: School,
        navigationOptions: ({ navigation }) => ({
            title: 'School',
            headerRight: <NavigationDrawerStructure navigationProps={navigation} />
        })
    },
    DetailsScreen: {
        screen: Details
    }
});

const StatusStack = createStackNavigator({
    StatusScreen: {
        screen: Status,
        navigationOptions: ({ navigation }) => ({
            title: 'Status',
            headerRight: <NavigationDrawerStructure navigationProps={navigation} />
        })
    },
    DetailsScreen: {
        screen: Details
    }
});

const TestStack = createStackNavigator({
    TestScreen: {
        screen: Test,
        navigationOptions: ({ navigation }) => ({
            title: 'Test',
            headerRight: <NavigationDrawerStructure navigationProps={navigation} />
        })
    },
    DetailsScreen: {
        screen: Details
    }
});

const ProfileStack = createStackNavigator({
    ProfileScreen: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
            title: 'Profile',
            headerRight: <NavigationDrawerStructure navigationProps={navigation} />
        })
    }
});

const ChangePasswordStack = createStackNavigator({
    ChangePassword: {
        screen: ChangePassword,
        navigationOptions: () => ({
            title: 'Change Password',
        }),
    }
});

const WeblinksStack = createStackNavigator({
    WeblinkScreen: {
        screen: Weblinks,
        navigationOptions: () => ({
            title: '',
        }),
    }
});


* For demonstrate on how to use the modules in Mobile App, we choose the Bottom Navigation bar tabs. 
* Each tab as module. 
* Get all modules assigned to user role in the system. 
* Creating the Tabs(Modules)runtime based on the API response for the login user.


// Use below function if app requires role based login with permisions and operations. 
// Create dynamic tabs(modules) based API response

const TabNavigator = createBottomTabNavigator({
    Chat: {
        screen: ChatStack,
        navigationOptions: {
            tabBarLabel: "CHAT"
        }
    },
    Classes: {
        screen: ClassesStack,
        navigationOptions: {
            tabBarLabel: "CLASSES"
        }
    },
    Status: {
        screen: StatusStack,
        navigationOptions: {
            tabBarLabel: "STATUS"
        }
    },
    School: {
        screen: SchoolStack,
        navigationOptions: {
            tabBarLabel: "SCHOOL"
        }
    },
    Reminder: {
        screen: ReminderStack,
        navigationOptions: {
            tabBarLabel: "REMINDER"
        }
    },
    Learn: {
        screen: LearnStack,
        navigationOptions: {
            tabBarLabel: "LEARN"
        }
    },
    Test: {
        screen: TestStack,
        navigationOptions: {
            tabBarLabel: "TEST"
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarLabel: "PROFILE"
        }
    }
},
    {
        // We can change the module name from "Chat" to any one of the modules for initial Route.
        initialRouteName: "Chat", // Initial route of bottomtab  bar
        tabBarComponent: props => {
            return <DynamicTabNavigator {...props} />; // Render dynamic tabs based on the API response
        },
        tabBarOptions: {
            showLabel: true,
            showIcon: false,
            style: {
                borderTopColor: "#000",
                borderTopWidth: 0.3,
                paddingBottom: 10,
            },
            labelStyle: {
                fontSize: 11,
                fontWeight: "300",
                fontFamily: Fonts.fontFamily
            }
        }
    }
);

*/

const HomeStack = createStackNavigator({
    ProfileScreen: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            title: 'Home',
            headerRight: <NavigationDrawerStructure navigationProps={navigation} />
        })
    }
});
  
const ProfileStack = createStackNavigator({
    ProfileScreen: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
            title: 'Profile',
            headerRight: <NavigationDrawerStructure navigationProps={navigation} />
        })
    }
});

const ChangePasswordStack = createStackNavigator({
    ChangePassword: {
        screen: ChangePassword
    }
});

const WeblinksStack = createStackNavigator({
    WeblinkScreen: {
        screen: Weblinks
    }
});

//Uncomment this function to use as normal user(without roles, permissions and operations) and comment above functions

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: "HOME"
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarLabel: "PROFILE"
        }
    }
},
    {
        initialRouteName: "Home", // Initial route
        tabBarOptions: {
            showLabel: true,
            showIcon: false,
            style: {
                 borderTopColor: "#000",
                 borderTopWidth: 0.3,
                 paddingBottom: 12
                },
            labelStyle: {
                 fontSize: 11,
                 }
            }
    }
);


// Create DrawerNavigator 
const DrawerNavigator = createDrawerNavigator({
    Home: TabNavigator,
    ChangePass: ChangePasswordStack,
    WebLink: WeblinksStack
},
    {
        drawerWidth: Constants.DRAWER_WIDTH,
        drawerType: "slide",
        overlayColor: "0%",
        initialRouteName: "Home",
        drawerPosition: "right",
        drawerLockMode: "locked-closed",
        contentComponent: DrawerScreen
    }
);

export default DrawerNavigator