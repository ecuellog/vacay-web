import React from 'react';
import './TabItem.scss';
import moment from 'moment';
import { setSelectedTab } from '../../store/actions/tabs';
import { connect } from 'react-redux';
class TabItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tab, setSelectedTab } = this.props;
    return (
      <div
        className="component-tab-item p-3 mb-3"
        onClick={() => setSelectedTab(tab._id)}
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
    setSelectedTab: (tabId) => dispatch(setSelectedTab(tabId))
  }
}

export default connect(null, mapDispatchToProps)(TabItem);