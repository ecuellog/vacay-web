import TabsService from '../../services/tabs';

export const SET_TAB_LIST = 'SET_TAB_LIST';
export const TABS_SET_REQUEST_PROCESSING = 'TABS_SET_REQUEST_PROCESSING';
export const TABS_SET_REQUEST_ERROR = 'TABS_SET_REQUEST_ERROR';

// Basic
function setTabList(tabs) {
  return {
    type: SET_TAB_LIST,
    tabs
  }
}

// Request status
function setRequestProcessing(value) {
  return {
    type: TABS_SET_REQUEST_PROCESSING,
    value
  }
}

function setRequestError(error) {
  return {
    type: TABS_SET_REQUEST_ERROR,
    error
  }
}

// With middleware
export function fetchCreatedTabs() {
  return function(dispatch) {
    dispatch(setRequestProcessing(true));
    return TabsService.getCreated()
      .then((res) => dispatch(setTabList(res.data.ledgers)))
      .catch((error) => {
        dispatch(setRequestError(error));
        console.error(error);
      })
      .then(() => dispatch(setRequestProcessing(false)))
  }
}