import 'react-native';
import React from 'react';
import ForgotPassword from '../src/Screens/Container/forgotPasswordContainer';
import store from '../src/store/store';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
        .create(<ForgotPassword store={store} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
