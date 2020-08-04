import React from 'react';
import moment from 'moment';
import * as _ from 'lodash';
import './TransactionItem.scss';

function TransactionItem(props) {
  return (
    <div
      className={`TransactionItem p-3 mb-3`}
    >
      <div>
        <h5 className="transaction-name">{props.transaction.name}</h5>
        <p className="tab-persons mb-0"> Created on: {props.transaction.createdAt} </p>
      </div>
    </div>
  );
}

export default TransactionItem;