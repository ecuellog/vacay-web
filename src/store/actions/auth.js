import AuthService from '../../services/auth';
import Cookies from 'js-cookie';

export const SET_AUTHENTICATED_USER = 'SET_AUTHENTICATED_USER';
export const UNSET_AUTHENTICATED_USER = 'UNSET_AUTHENTICATED_USER';
export const SET_INITIAL_AUTH_DONE = 'SET_INITIAL_AUTH_DONE';
export const AUTH_SET_REQUEST_PROCESSING = 'AUTH_SET_REQUEST_PROCESSING';
export const AUTH_SET_REQUEST_ERROR = 'AUTH_SET_REQUEST_ERROR';

// Basic
function setAuthenticatedUser(user) {
  return {
    type: SET_AUTHENTICATED_USER,
    user
  }
}

function unsetAuthenticatedUser() {
  return {
    type: UNSET_AUTHENTICATED_USER
  }
}

function setInitialAuthDone(value) {
  return {
    type: SET_INITIAL_AUTH_DONE,
    value
  }
}

// Request status
function setRequestProcessing(value) {
  return {
    type: AUTH_SET_REQUEST_PROCESSING,
    value
  }
}

function setRequestError(error) {
  return {
    type: AUTH_SET_REQUEST_ERROR,
    error
  }
}

// With middleware
export function authenticateUser(email, password) {
  return function(dispatch) {
    dispatch(setRequestProcessing(true));
    return AuthService.login(email, password)
      .then((res) => dispatch(setAuthenticatedUser(res.data.user)))
      .catch((error) => dispatch(setRequestError(error.response.data.message)))
      .then(() => dispatch(setRequestProcessing(false)))
    ;
  };
}

export function setTokenAuthenticatedUser() {
  return function(dispatch) {
    dispatch(setRequestProcessing(true));
    return AuthService.getCurrentAuthUser()
      .then((res) => dispatch(setAuthenticatedUser(res.data.user)))
      .catch(() => {})
      .then(() => {
        dispatch(setRequestProcessing(false));
        dispatch(setInitialAuthDone(true));
      })
    ;
  };
}

export function deauthenticateUser() {
  return function(dispatch) {
    dispatch(setRequestProcessing(true));
    return AuthService.logout()
      .then((res) => {
        dispatch(unsetAuthenticatedUser());
        Cookies.remove('csrf-token');
        Cookies.remove('access-token');
        Cookies.remove('refresh-token');        
      })
      .catch((error) => dispatch(setRequestError(error.response.data.message)))
      .then(() => dispatch(setRequestProcessing(false)))
    ;
  }
}