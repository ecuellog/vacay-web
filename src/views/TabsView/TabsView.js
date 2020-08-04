import React from 'react';
import TabList from '../../components/TabList/TabList';
import TabDetails from '../../components/TabDetails/TabDetails';
import SideBarViewContainerBase from '../../components/SideBarViewContainerBase/SideBarViewContainerBase';
import './TabsView.scss';
import SideBarMain from '../../components/SideBarMain/SideBarMain';

function TabsView(props) {
  return (
    <SideBarViewContainerBase sidebar={<SideBarMain/>}>
      <div className="container-tabs-view d-flex">
        <div className="flex-grow-1">
          <TabList/>
        </div>
        <div className="tab-info my-3 d-none d-xl-block">
          <TabDetails/>
        </div>
      </div>
    </SideBarViewContainerBase>
  )
}

export default TabsView;