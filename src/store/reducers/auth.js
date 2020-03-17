import {
  SET_AUTHENTICATED_USER,
  AUTH_SET_REQUEST_PROCESSING,
  AUTH_SET_REQUEST_ERROR
} from '../actions/auth';

var defaultState = {
  user: {},
  requestProcessing: false,
  requestError: '',
  isAuthenticated: false
}

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED_USER:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true
      }
    case AUTH_SET_REQUEST_PROCESSING:
      return {
        ...state,
        requestProcessing: action.value
      }
    case AUTH_SET_REQUEST_ERROR:
      return {
        ...state,
        requestError: action.error
      }
    default:
      return state
  }
}


export default auth;