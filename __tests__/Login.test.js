import React from 'react';
import LoginContainer from '../src/Screens/Container/loginContainer';
import Login from '../src/Screens/Presentational/login';
import store from '../src/store/store';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Render Login component without crashing', () => {

  // Testing the presentational component render(Tracking expected/unexpected in UI).

  it('Render Login component without crashing', () => {
    const tree = renderer
      .create(<LoginContainer store={store} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  // Pass data to state of component.

  it('componentWillMount: set state values', () => {
    const wrapper = shallow(<LoginContainer store={store} />);
    wrapper.setState({ email: 'raghav@bosframework.com' })
    expect(wrapper.state('email')).toEqual('raghav@bosframework.com');
  });

  // Find the controls/elements/child component in the LoginContainer component.

  it('Find components/Elements', () => {

    const wrapper = shallow(<Login data={{
      email: '',
      password: '',
      errors: {
        emailEmpty: false,
        emailError: false,
        passwordEmpty: false,
        passwordError: false,
      },
      isLoading: false,
    }} />);
    expect(wrapper.find('Button').length).toEqual(2);
  });

  // Button action/press test. ToDo with all button controls.

  it('Button tap test', () => {

    let handleLoginMock = jest.fn()

    let LoginComponent = renderer.create(<Login onPressLogin={handleLoginMock}
      data={{
        email: '',
        password: '',
        errors: {
          emailEmpty: false,
          emailError: false,
          passwordEmpty: false,
          passwordError: false,
        },
        isLoading: false,
      }} />).getInstance()

    LoginComponent.props.onPressLogin();
    expect(handleLoginMock).toHaveBeenCalled()
  });

  it("should render a <View />", () => {
    expect(props.navigation.navigate).toHaveBeenCalledWith('LoginScreen');   // SUCCESS
  });

});




