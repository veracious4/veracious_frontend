import { SIGN_IN, SIGN_OUT, SIGN_UP, AUTH_FAILED, TOKEN_EXPIRED} from '../actions/actionTypes';
const INITIAL_STATE = {
    isSignedIn: localStorage.getItem('v_isSignedIn'),
    token: localStorage.getItem('v_token'),
    timestamp: localStorage.getItem('v_timestamp'),
    error: null,
    message: null
}

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_UP:
            return { ...state, isSignedIn: true, token: action.payload.token, timestamp: action.payload.timestamp, error: null, message: null }
        case SIGN_IN:
            return { ...state, isSignedIn: true, token: action.payload.token, timestamp: action.payload.timestamp, error: null, message: null }
        case SIGN_OUT:
            return { ...state, isSignedIn: false, token: null, error: null, timestamp: null, message: action.payload.msg }
        case AUTH_FAILED:
            return { ...state, isSignedIn: false, token: null, error: action.payload.error, timestamp: null, message: null }
        case TOKEN_EXPIRED:
            return { ...state, isSignedIn: false, token: null, error: null, timestamp: null, message: action.payload.msg }
        default:
            return state
    }
}