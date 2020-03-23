import { combineReducers } from 'redux';
import auth from './auth';
import tabs from './tabs';

export default combineReducers({
  auth,
  tabs
})