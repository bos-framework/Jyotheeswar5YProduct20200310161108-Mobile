class RequestService {

  getRequest(url, token) {

    let data = fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
      }
    }).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
    return data;

  }

  postRequest(url, params, token) {

    let data = fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(params),
    }).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
    return data;

  }

  putRequest(url, params, token) {

    let data = fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(params),
    }).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
    return data;

  }

  patchRequest(url, params, token) {

    let data = fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(params),
    }).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
    return data;

  }

}

export default new RequestService();
