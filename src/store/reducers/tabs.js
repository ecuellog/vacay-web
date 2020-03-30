import {
  SET_TAB_LIST,
  ADD_TAB,
  SET_SELECTED_TAB,
  SET_TAB_BALANCE,
  TABS_SET_REQUEST_PROCESSING,
  TABS_SET_REQUEST_ERROR
} from '../actions/tabs';

var defaultState = {
  tabs: [],
  selectedTab: null,
  tabBalance: null,
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
    case ADD_TAB: {
      return {
        ...state,
        tabs: [...state.tabs, action.tab]
      };
    }
    case SET_SELECTED_TAB: {
      const tab = state.tabs.find(tab => tab._id === action.tabId);
      return {
        ...state,
        selectedTab: tab
      };
    }
    case SET_TAB_BALANCE: {
      return {
        ...state,
        tabBalance: action.balance
      };
    }
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