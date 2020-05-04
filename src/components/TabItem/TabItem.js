import React from 'react';
import './TabItem.scss';
import moment from 'moment';
import { setSelectedTabFromList } from '../../store/actions/tabs';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as _ from 'lodash';
class TabItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleTabItemClick = this.handleTabItemClick.bind(this);
  }

  handleTabItemClick(tabId) {
    if(tabId === _.get(this.props.selectedTab, '_id')) {
      this.props.history.push(`/tabs/${tabId}`);
    } else {
      console.log(tabId);
      this.props.setSelectedTabFromList(tabId);
    }
  }

  render() {
    const { tab, selectedTab } = this.props;
    return (
      <div
        className={`
          component-tab-item p-3 mb-3
          ${tab._id === _.get(selectedTab, "_id") ? "active": ""}
        `}
        onClick={() => this.handleTabItemClick(tab._id)}
      >
        <div>
          <h5 className="tab-name">{tab.name}</h5>
          <p className="tab-persons mb-0"> {tab.persons.length} persons in this tab </p>
        </div>
        <div className="d-flex">
          <span className="tab-modified-at pr-3">Last modified: <b>{moment(tab.updatedAt).fromNow()}</b></span>
          <div className="options-section p-2">
            <span className="fas fa-ellipsis-v options-icon"></span>
          </div>
        </div>
      </div>
    );
  }
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