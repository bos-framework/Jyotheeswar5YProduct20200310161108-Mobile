import 'react-native';
import 'isomorphic-fetch';
import Remote from '../src/Config/remote';

describe('Api test', () => {

  it('Success login Api test', async function () {

    let params = {
      username: "teacher@mailinator.com",
      password: 'Teacher@123',
    };

    let data = await fetch('https://apis.dev.bosframework.com/auth/odata/Verification?api-version=1.0', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: Remote.APP_KEY
      },
      body: JSON.stringify(params),
    }).then(response => {
      return response.json();
    }).then((responseJson) => {
      return responseJson;
    }).catch(error => {
      return error;
    });
    expect(data.userId).toEqual('b4bd2da8-dcf0-4c30-bc7a-aa4d0892722b');
  });


  it('Get user details', async function () {

    let email = "teacher@mailinator.com";

    let data = await fetch(`https://apis.dev.bosframework.com/auth/odata/users?$filter=email eq ${"'"}${email}${"'"}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: Remote.APP_KEY
      }
    }).then(response => {
      return response.json();
    }).then((responseJson) => {
      return responseJson;
    }).catch(error => {
      return error;
    });

    expect(data.value[0].id).toEqual('0bcd7745-6dce-4c1a-b504-dae749a75357');
    expect(data.value[0].firstname).toEqual('Teacher');

  });


  it('Get Roles ', async function () {

    let data = await fetch(`https://apis.dev.bosframework.com/auth/odata/Roles?api-version=1.0`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: Remote.APP_KEY
      }
    }).then(response => {
      return response.json();
    }).then((responseJson) => {
      return responseJson;
    }).catch(error => {
      return error;
    });

    expect(data.value[0].name).toEqual('User');

  });


  it('Get modules for user with Id ', async function () {

    let userId = "b4bd2da8-dcf0-4c30-bc7a-aa4d0892722b";

    let data = await fetch(`https://apis.dev.bosframework.com/ia/odata/Permissions/GetOwnerPermissionsSets${"("}ownerId=${userId}${")"}?api-version=1.0`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: Remote.APP_KEY
      }
    }).then(response => {
      return response.json();
    }).then((responseJson) => {
      return responseJson;
    }).catch(error => {
      return error;
    });
    
    expect(data.modules[0].name).toEqual('Chat');

  });

});