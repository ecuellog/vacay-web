import React from 'react';
import './TabItem.scss';
import moment from 'moment';
import { setSelectedTabFromList } from '../../store/actions/tabs';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import get from 'lodash/get';

function TabItem(props) {
  return (
    <div
      className={`
        component-tab-item p-3 mb-3
        ${props.tab._id === get(props.selectedTab, "_id") ? "active": ""}
      `}
      onClick={() => props.setSelectedTabFromList(props.tab._id)}
    >
      <div>
        <h5 className="tab-name">{props.tab.name}</h5>
        <p className="tab-persons mb-0"> {props.tab.participants.length} participants </p>
      </div>
      <div className="d-flex">
        <span className="tab-modified-at pr-3">Last modified: <b>{moment(props.tab.updatedAt).fromNow()}</b></span>
        <div className="options-section p-2">
          <span className="fas fa-ellipsis-v options-icon"></span>
        </div>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedTabFromList: (tabId) => dispatch(setSelectedTabFromList(tabId))
  }
}

function mapStateToProps(state) {
  return {
    selectedTab: state.tabs.selectedTab
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TabItem));