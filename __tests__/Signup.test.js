import 'react-native';
import React from 'react';
import SignupContainer from '../src/Screens/Container/signUpContainer';
import Signup from '../src/Screens/Presentational/signUp';
import store from '../src/store/store';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Render Signup component without crashing', () => {

    it('renders correctly', () => {
        const tree = renderer
            .create(<SignupContainer store={store} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    // Pass data to state of component.

    it('componentWillMount: set state values', () => {
        const component = shallow(<SignupContainer store={store} />);
        component.setState({ firstName: 'TestFirstName' })
        component.setState({ lastName: 'TestLastName' })
        expect(component.state('firstName')).toEqual('TestFirstName');
        expect(component.state('lastName')).toEqual('TestLastName');
    });


    // Find the controls/elements/child component in the SignupContainer component.

    it('Find components/Elements', () => {

        const component = shallow(<Signup data={{
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
        }} />);
        expect(component.find('Button').length).toEqual(1);
    });


    // Button action/press test. ToDo with all button controls.

    it('Button tap test', () => {

        let handleSignupMock = jest.fn()

        let component = renderer.create(<Signup onPressSubmit={handleSignupMock}
            data={{
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
            }} />).getInstance()

        component.props.onPressSubmit();
        expect(handleSignupMock).toHaveBeenCalled()

    });
});