import 'react-native';
import React from 'react';
import ChangePasswordContainer from '../src/Screens/Container/changePasswordContainer';
import ChangePassword from '../src/Screens/Presentational/changePassword';
import store from '../src/store/store';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
describe('Render changepassword component without crashing', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<ChangePasswordContainer store={store} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    // Pass data to state of component.

    it('componentWillMount: set state values', () => {
        const component = shallow(<ChangePasswordContainer store={store} />);
        component.setState({ currentPassword: 'password' })
        expect(component.state('currentPassword')).toEqual('password');
    });

    // Find the controls/elements/child component in the ChangepasswordContainer component.

    it('Find components/Elements', () => {

        const component = shallow(<ChangePassword data={{
            userId: '',
            currentPassword: '',
            newPassword: '',
            confirmNewPasword: '',
            errors: {
                currentPasswordEmpty: false,
                newPasswordError: false,
                confirmNewPaswordError: false,
                passwordNotMatches: false
            }
        }} />);
        expect(component.find('Button').length).toEqual(1);
    });

    // Button action/press test. ToDo with all button controls.

    it('Button tap test', () => {

        let handleSaveMock = jest.fn()

        let component = renderer.create(<ChangePassword onSaveBtnTapped={handleSaveMock}
            data={{
                userId: '',
                currentPassword: '',
                newPassword: '',
                confirmNewPasword: '',
                errors: {
                    currentPasswordEmpty: false,
                    newPasswordError: false,
                    confirmNewPaswordError: false,
                    passwordNotMatches: false
                }
            }} />).getInstance()

        component.props.onSaveBtnTapped();
        expect(handleSaveMock).toHaveBeenCalled()

    });
});