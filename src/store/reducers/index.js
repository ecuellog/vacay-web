import { combineReducers } from 'redux';
import auth from './auth';
import tabs from './tabs';
import transactions from './transactions';

export default combineReducers({
  auth,
  tabs,
  transactions
})