import TransactionsService from '../../services/transactions';
import { setTabBalance } from './tabs';
import Calculator from '../../services/calc';

export const SET_TRANSACTION_LIST = 'SET_TRANSACTION_LIST';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const SET_SELECTED_TRANSACTION = 'SET_SELECTED_TRANSACTION';
export const TRANSACTIONS_SET_REQUEST_PROCESSING = 'TRANSACTIONS_SET_REQUEST_PROCESSING';
export const TRANSACTIONS_SET_REQUEST_ERROR = 'TRANSACTIONS_SET_REQUEST_ERROR';

// Basic
function setTransactionList(transactions) {
  return {
    type: SET_TRANSACTION_LIST,
    transactions
  }
}

function addTransaction(transaction) {
  return {
    type: ADD_TRANSACTION,
    transaction
  }
}

function setSelectedTransaction(transaction) {
  return {
    type: SET_SELECTED_TRANSACTION,
    transaction
  }
}
// Request status
function setRequestProcessing(value) {
  return {
    type: TRANSACTIONS_SET_REQUEST_PROCESSING,
    value
  }
}

function setRequestError(error) {
  return {
    type: TRANSACTIONS_SET_REQUEST_ERROR,
    error
  }
}

// With middleware
export function fetchTransactions(tabId) {
  return function(dispatch, getState) {
    dispatch(setRequestProcessing(true));
    return TransactionsService.getByTab(tabId)
      .then((res) => {
        const balances = Calculator.balances(
          res.data.transactions,
          getState().tabs.selectedTab.participants
        )
        dispatch(setTabBalance(balances));
        dispatch(setTransactionList(res.data.transactions));
      })
      .catch((error) => {
        dispatch(setRequestError(error));
        console.error(error);
      })
      .then(() => dispatch(setRequestProcessing(false)))
  }
}

export function createTransaction(transaction) {
  return function(dispatch, getState) {
    dispatch(setRequestProcessing(true));
    return TransactionsService.create(transaction)
      .then((res) => {
        const selectedTab = getState().tabs.selectedTab;
        
        if(selectedTab._id === transaction.ledger) {
          const balances = Calculator.balances(
            [...getState().transactions.transactions, res.data.transaction],
            selectedTab.participants
          );
          dispatch(addTransaction(res.data.transaction));
          dispatch(setTabBalance(balances));
        }
      })
      .catch((error) => {
        dispatch(setRequestError(error));
        console.error(error);
      })
      .then(() => dispatch(setRequestProcessing(false)))
  }
}