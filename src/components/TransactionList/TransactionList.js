import React from 'react';
import { fetchCreatedTabs, createTab } from '../../store/actions/tabs';
import { connect } from 'react-redux';
import TransactionItem from '../TransactionItem/TransactionItem';
import './TransactionList.scss';

function TransactionList(props) {
  return (
    <div className="TransactionList pt-2">
      <h2 className="mb-3 mx-3">Transactions</h2>
      <div className="list px-3">
        { props.transactions.map((transaction) => 
          <TransactionItem transaction={transaction} key={transaction._id}/>
        )}
      </div>
      <button
        className="btn btn-primary btn-float-action"
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCreatedTabs: () => dispatch(fetchCreatedTabs()),
    createTab: (tab) => dispatch(createTab(tab))
  }
}

function mapStateToProps(state) {
  return {
    transactions: state.transactions.transactions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);