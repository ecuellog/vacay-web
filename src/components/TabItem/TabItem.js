import React from 'react';
import './TabItem.scss';

class TabItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { tab } = this.props;
    return (
      <div className="component-tab-item p-3 my-3">
        <div>
          <h5 className="tab-name">{tab.name}</h5>
          <p className="tab-persons mb-0"> {tab.persons.length} persons in this tab </p>
        </div>
        <div className="d-flex">
          <span className="tab-modified-at pr-3">Last modified: {tab.updatedAt}</span>
          <div className="options-section p-2">
            <span className="fas fa-ellipsis-v options-icon"></span>
          </div>
        </div>
      </div>
    );
  }
}

export default TabItem;