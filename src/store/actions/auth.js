import AuthService from '../../services/auth';

export const SET_AUTHENTICATED_USER = 'AUTHENTICATE_USER';
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const AUTH_SET_REQUEST_PROCESSING = 'AUTH_SET_REQUEST_PROCESSING';
export const AUTH_SET_REQUEST_ERROR = 'AUTH_SET_REQUEST_ERROR';

// Basic
export function setAuthenticatedUser(user) {
  return {
    type: SET_AUTHENTICATED_USER,
    user
  }
}

export function fetchCurrentUser() {
  return {
    type: FETCH_CURRENT_USER
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
      .then((user) => dispatch(setAuthenticatedUser(user)))
      .catch((error) => dispatch(setRequestError(error.response.data.message)))
      .then(() => dispatch(setRequestProcessing(false)))
    ;
  };
}