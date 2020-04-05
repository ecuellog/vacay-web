import React from 'react';
import './TabDetails.scss';
import { fetchTransactions } from '../../store/actions/transactions';
import moment from 'moment';
import { connect } from 'react-redux';
import * as _ from 'lodash';

class TabDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProp, prevState) {
    if(prevProp.tab !== this.props.tab ) {
      this.props.fetchTransactions(this.props.tab._id);
    }
  }

  render() {
    const { tab, balance } = this.props;
    return (
      <div>
        { tab !== null &&
          <div
            className="component-tab-details p-2 mb-3"
          >
            <h2 className="mb-0">{ tab.name }</h2>
            <p className="created-on">Created on { moment(tab.createdAt).format('MMM D, YYYY') }</p>

            {/* Balances */}
            <div className="mt-4 mb-3 d-flex justify-content-between align-items-baseline">
              <h4>Balances</h4>
              <button className="btn btn-outline-primary btn-sm">Add Person</button>
            </div>
            { balance && tab.persons.map(person => (
                <div className="d-flex justify-content-between mb-2" key={person}>
                  <p>{ person }</p>
                  <p>${ _.get(balance.balances.get(person), 'total') }</p>
                </div>
            ))}

            {/* Total spent */}
            <div className="d-flex justify-content-between mt-4">
              <h4>Total Spent</h4>
              { balance && 
                <h4>${ balance.total }</h4>
              }
            </div>

            {/* Action Buttons */}
            <div className="row mt-4">
              <div className="col-xl-6 text-center">
                <button className="btn btn-block btn-primary">View Details</button>
              </div>
              <div className="col-xl-6 text-center">
                <button className="btn btn-block btn-primary">Add Transaction</button>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTransactions: (tabId) => dispatch(fetchTransactions(tabId))
  }
}

function mapStateToProps(state) {
  return {
    transactions: state.transactions.transactions,
    tab: state.tabs.selectedTab,
    balance: state.tabs.tabBalance
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabDetails);