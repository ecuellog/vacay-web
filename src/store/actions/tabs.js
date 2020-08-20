import TabsService from '../../services/tabs';
import { setFriends } from './friends';

export const SET_TAB_LIST = 'SET_TAB_LIST';
export const ADD_TAB = 'ADD_TAB';
export const SET_SELECTED_TAB = 'SET_SELECTED_TAB';
export const SET_SELECTED_TAB_FROM_LIST = 'SET_SELECTED_TAB_FROM_LIST';
export const SET_TAB_BALANCE = 'SET_TAB_BALANCE';
export const TABS_SET_REQUEST_PROCESSING = 'TABS_SET_REQUEST_PROCESSING';
export const TABS_SET_REQUEST_ERROR = 'TABS_SET_REQUEST_ERROR';

// Basic
function setTabList(tabs) {
  return {
    type: SET_TAB_LIST,
    tabs
  };
}

function addTab(tab) {
  return {
    type: ADD_TAB,
    tab
  };
}

export function setSelectedTab(tab) {
  return {
    type: SET_SELECTED_TAB,
    tab
  };
}

export function setSelectedTabFromList(tabId) {
  return {
    type: SET_SELECTED_TAB_FROM_LIST,
    tabId
  };
}

export function setTabBalance(balance) {
  return {
    type: SET_TAB_BALANCE,
    balance
  };
}
// Request status
function setRequestProcessing(value) {
  return {
    type: TABS_SET_REQUEST_PROCESSING,
    value
  };
}

function setRequestError(error) {
  return {
    type: TABS_SET_REQUEST_ERROR,
    error
  };
}

// With middleware
export function fetchCreatedTabs() {
  return function(dispatch) {
    dispatch(setRequestProcessing(true));
    return TabsService.getCreated()
      .then(res => {
        dispatch(setTabList(res.data.ledgers));
        if (res.data.ledgers.length)
          dispatch(setSelectedTab(res.data.ledgers[0]));
      })
      .catch(error => {
        dispatch(setRequestError(error));
        console.error(error);
      })
      .then(() => dispatch(setRequestProcessing(false)));
  };
}

export function fetchSharedTabs() {
  return function(dispatch) {
    dispatch(setRequestProcessing(true));
    return TabsService.getShared()
      .then(res => {
        dispatch(setTabList(res.data.ledgers));
        if (res.data.ledgers.length)
          dispatch(setSelectedTab(res.data.ledgers[0]));
      })
      .catch(error => {
        dispatch(setRequestError(error));
        console.error(error);
      })
      .then(() => dispatch(setRequestProcessing(false)));
  };
}

export function createTab(tab) {
  return function(dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(setRequestProcessing(true));
      TabsService.create(tab)
        .then(res => {
          dispatch(addTab(res.data.ledger));
          let friends = getState().friends.friends;
          let newFriendList = [...friends, ...res.data.newFriends];
          dispatch(setFriends(newFriendList));
          resolve();
        })
        .catch(error => {
          dispatch(setRequestError(error));
          reject(error);
        })
        .then(() => dispatch(setRequestProcessing(false)));
    });
  };
}

export function getTab(tabId) {
  return function(dispatch) {
    dispatch(setRequestProcessing(true));
    return TabsService.get(tabId)
      .then(res => dispatch(setSelectedTab(res.data.ledger)))
      .catch(error => {
        dispatch(setRequestError(error));
        console.error(error);
      })
      .then(() => dispatch(setRequestProcessing(false)));
  };
}
