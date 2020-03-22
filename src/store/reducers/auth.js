import {
  SET_AUTHENTICATED_USER,
  UNSET_AUTHENTICATED_USER,
  SET_INITIAL_AUTH_DONE,
  AUTH_SET_REQUEST_PROCESSING,
  AUTH_SET_REQUEST_ERROR
} from '../actions/auth';

var defaultState = {
  user: {},
  initialAuthDone: false,
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
    case UNSET_AUTHENTICATED_USER:
      return {
        ...state,
        user: {},
        isAuthenticated: false
      }
    case SET_INITIAL_AUTH_DONE:
      return {
        ...state,
        initialAuthDone: action.value
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