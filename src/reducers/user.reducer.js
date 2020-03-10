
import {
    SAVE_USER_ID,
    SAVE_USER_DETAILS,
    LOGOUT_USER,
    SAVE_TOKEN
} from '../actions/types';

const INITIAL_STATE = {
    userId: null,
    token: null,
    userDetails: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_TOKEN:
            return { ...state, token: action.payload };
        case SAVE_USER_ID:
            return { ...state, userId: action.payload };
        case SAVE_USER_DETAILS:
            return { ...state, userDetails: action.payload };
        case LOGOUT_USER:
            return { userDetails: null, userId: null, token: null };
        default:
            return state;
    }
};