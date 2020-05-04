import React from 'react';
import TabDetails from '../../components/TabDetails/TabDetails';
import './TabDetailView.scss';

class TabDetailView extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="container-tab-detail-view row">
        <div className="col-6">
          <TabDetails/>
        </div>
        <div className="col-6">
          <TabDetails/>
        </div>
      </div>
    )
  }
}

export default TabsView;