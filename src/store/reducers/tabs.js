import {
  SET_TAB_LIST,
  TABS_SET_REQUEST_PROCESSING,
  TABS_SET_REQUEST_ERROR
} from '../actions/tabs';

var defaultState = {
  tabs: [],
  requestProcessing: false,
  requestError: ''
}

const tabs = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TAB_LIST:
      return {
        ...state,
        tabs: action.tabs
      };
    case TABS_SET_REQUEST_PROCESSING:
      return {
        ...state,
        requestProcessing: action.value
      };
    case TABS_SET_REQUEST_ERROR:
      return {
        ...state,
        requestError: action.error
      };
    default:
      return state;
  }
}

export default tabs;