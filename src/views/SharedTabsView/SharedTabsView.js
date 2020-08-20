import React from 'react';
import SideBarMain from '../../components/SideBarMain/SideBarMain';
import SideBarViewContainerBase from '../../components/SideBarViewContainerBase/SideBarViewContainerBase';
import TabList from '../../components/TabList/TabList';
import TabDetails from '../../components/TabDetails/TabDetails';

function SharedTabsView() {
  return (
    <SideBarViewContainerBase sidebar={<SideBarMain />}>
      <div className="container-tabs-view d-flex">
        <div className="flex-grow-1">
          <TabList tabType="shared" />
        </div>
        <div className="tab-info my-3 d-none d-xl-block">
          <TabDetails />
        </div>
      </div>
    </SideBarViewContainerBase>
  );
}

export default SharedTabsView;
