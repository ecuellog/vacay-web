import React from 'react';
import moment from 'moment';
import * as _ from 'lodash';
import './TransactionItem.scss';

class TransactionItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { transaction } = this.props;
    return (
      <div
        className={`TransactionItem p-3 mb-3`}
      >
        <div>
          <h5 className="transaction-name">{transaction.name}</h5>
          <p className="tab-persons mb-0"> Created on: {transaction.createdAt} </p>
        </div>
      </div>
    );
  }
}

/*function mapDispatchToProps(dispatch) {
  return {
    setSelectedTabFromList: (tabId) => dispatch(setSelectedTabFromList(tabId))
  }
}

function mapStateToProps(state) {
  return {
    selectedTab: state.tabs.selectedTab
  }
}*/

export default TransactionItem;