import {
  SAVE_USER_ID,
  SAVE_USER_DETAILS,
  LOGOUT_USER,
  SAVE_TOKEN
} from './types';

export const saveToken = token => {
  return dispatch => {
    dispatch({ type: SAVE_TOKEN, payload: token });
  };
};

export const saveUserId = userId => {
  return dispatch => {
    dispatch({ type: SAVE_USER_ID, payload: userId });
  };
};

export const saveUserDetails = userDetails => {
  return dispatch => {
    dispatch({ type: SAVE_USER_DETAILS, payload: userDetails });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });
  };
}

