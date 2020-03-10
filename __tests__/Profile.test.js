import React from 'react';
import ProfileContainer from '../src/Screens/Container/profileContainer';
import Profile from '../src/Screens/Presentational/profile';
import store from '../src/store/store';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Render Profile component without crashing', () => {

  // Testing the presentational component render(Tracking expected/unexpected in UI).

//   it('Render Profile component without crashing', () => {
//     const tree = renderer
//       .create(<ProfileContainer store={store} />)
//       .toJSON();
//     expect(tree).toMatchSnapshot();
//   });


  // Pass data to state of component.

  it('componentWillMount: set state values', () => {
    const wrapper = shallow(<ProfileContainer store={store} />);
    wrapper.setState({ firstName: 'Test' })
    expect(wrapper.state('firstName')).toEqual('Test');
  });

  // Find the controls/elements/child component in the LoginContainer component.

  it('Find components/Elements', () => {

    const wrapper = shallow(<Profile data={{
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
    }} />);
    expect(wrapper.find('Input').length).toEqual(4);
    expect(wrapper.find('DatePicker').length).toEqual(1);

  });

  // Button action/press test. ToDo with all button controls.

  it('Button tap test', () => {

    let handleFuncMock = jest.fn()

    let component = renderer.create(<Profile onSaveBtnTapped={handleFuncMock}
      data={{
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
    }} />).getInstance()

    component.props.onSaveBtnTapped();
    expect(handleFuncMock).toHaveBeenCalled()
  })

});




