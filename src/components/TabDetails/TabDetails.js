import React, { useState, useEffect } from 'react';
import './TabDetails.scss';
import { fetchTransactions } from '../../store/actions/transactions';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import ModalTransactionAdd from '../ModalTransactionAdd/ModalTransactionAdd';

function TabDetails(props) {
  const history = useHistory();
  const [showTransactionAddModal, setShowTransactionAddModal] = useState(false);

  useEffect(() => {
    if (props.tab) props.fetchTransactions(props.tab._id);
  }, [props.tab, props.fetchTransactions]);

  function handleTransactionAddModalClose() {
    setShowTransactionAddModal(false);
  }

  function handleTransactionAddModalOpen() {
    setShowTransactionAddModal(true);
  }

  function handleViewDetailsClick() {
    history.push(`/tabs/${props.tab._id}`);
  }

  return (
    <div>
      {props.tab !== null && (
        <div className="component-tab-details px-3 py-2 mb-3">
          <h2 className="mb-0">{props.tab.name}</h2>
          <p className="created-on">
            Created on {moment(props.tab.createdAt).format('MMM D, YYYY')}
          </p>

          {/* Balances */}
          <div className="mt-4 mb-3 d-flex justify-content-between align-items-baseline">
            <h4>Balances</h4>
            <button className="btn btn-outline-primary btn-sm">
              Add Person
            </button>
          </div>
          {props.balance &&
            props.tab.participants.map(participant => (
              <div
                className="d-flex justify-content-between mb-2"
                key={participant.friend._id}
              >
                <p>{participant.friend.name}</p>
                <p>
                  $
                  {_.get(
                    props.balance.balances.get(participant.friend._id),
                    'total'
                  )}
                </p>
              </div>
            ))}

          {/* Total spent */}
          <div className="d-flex justify-content-between mt-4">
            <h4>Total Spent</h4>
            {props.balance && <h4>${props.balance.total}</h4>}
          </div>

          {/* Action Buttons */}
          <div className="row no-gutters mt-4">
            <div className="col-6 text-center pr-2">
              <button
                className="btn btn-block btn-primary"
                onClick={handleViewDetailsClick}
              >
                View Details
              </button>
            </div>
            <div className="col-6 text-center pl-2">
              <button
                className="btn btn-block btn-primary"
                onClick={handleTransactionAddModalOpen}
              >
                Add Transaction
              </button>
            </div>
          </div>

          {/* Create Transaction */}
          <ModalTransactionAdd
            showModal={showTransactionAddModal}
            handleModalClose={handleTransactionAddModalClose}
            tab={props.tab}
          ></ModalTransactionAdd>
        </div>
      )}
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTransactions: tabId => dispatch(fetchTransactions(tabId))
  };
}

function mapStateToProps(state) {
  return {
    transactions: state.transactions.transactions,
    tab: state.tabs.selectedTab,
    balance: state.tabs.tabBalance,
    friends: state.friends.friends
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabDetails);
