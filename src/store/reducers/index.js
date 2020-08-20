import { combineReducers } from 'redux';
import auth from './auth';
import tabs from './tabs';
import transactions from './transactions';
import friends from './friends';

export default combineReducers({
  auth,
  tabs,
  transactions,
  friends
})