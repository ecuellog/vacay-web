import React from 'react';
import TabList from '../../components/TabList/TabList';
import TabDetails from '../../components/TabDetails/TabDetails';
import './TabsView.scss';

class TabsView extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="container-tabs-view row">
        <div className="col-8">
          <TabList/>
        </div>
        <div className="tab-info my-3 col-4">
          <TabDetails/>
        </div>
      </div>
    )
  }
}

export default TabsView;