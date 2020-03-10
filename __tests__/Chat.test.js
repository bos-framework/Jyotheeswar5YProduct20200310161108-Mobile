import React from 'react';
import Chat from '../src/Screens/Container/Modules/Chat';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Render Chat component without crashing', () => {

  it('Render Chat component without crashing', () => {
    const tree = renderer
      .create(<Chat />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Pass data to state of component.
  it('componentWillMount: set state values', () => {
    const wrapper = shallow(<Chat />);
    wrapper.setState({ subModules: ["Teacher", "parent"] })
    expect(wrapper.state('subModules')).toEqual(["Teacher", "parent"]);
  });

  // Find the controls/elements/child component in the Chat component.
  it('Find components/Elements', () => {

    const wrapper = shallow(<Chat />);
    expect(wrapper.find('View').length).toEqual(3);
  });
});