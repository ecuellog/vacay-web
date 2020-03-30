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
            className="component-tab-details p-3 mb-3"
          >
            <h2 className="mb-0">{ tab.name }</h2>
            <p className="created-on">Created on { moment(tab.createdAt).format('MMM D, YYYY') }</p>

            {/* Balances */}
            <h4 className="mt-4">Balances</h4>
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