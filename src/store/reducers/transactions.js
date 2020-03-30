import {
  SET_TRANSACTION_LIST,
  ADD_TRANSACTION,
  SET_SELECTED_TRANSACTION,
  TRANSACTIONS_SET_REQUEST_PROCESSING,
  TRANSACTIONS_SET_REQUEST_ERROR
} from '../actions/transactions';

var defaultState = {
  transactions: [],
  selectedTransaction: null,
  requestProcessing: false,
  requestError: ''
}

const transactions = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TRANSACTION_LIST:
      return {
        ...state,
        transactions: action.transactions
      };
    case ADD_TRANSACTION: {
      return {
        ...state,
        transactions: [...state.transactions, action.transaction]
      };
    }
    case SET_SELECTED_TRANSACTION: {
      return {
        ...state,
        selectedtransaction: action.transaction
      };
    }
    case TRANSACTIONS_SET_REQUEST_PROCESSING:
      return {
        ...state,
        requestProcessing: action.value
      };
    case TRANSACTIONS_SET_REQUEST_ERROR:
      return {
        ...state,
        requestError: action.error
      };
    default:
      return state;
  }
}

export default transactions;