import React from 'react';
import SideBarMain from '../components/SideBarMain/SideBarMain';
import SideBarViewContainerBase from '../components/SideBarViewContainerBase/SideBarViewContainerBase';

function SharedTabsView() {
  return (
    <SideBarViewContainerBase sidebar={<SideBarMain/>}>
      <h1>SharedTabsView</h1>
    </SideBarViewContainerBase>
  );
}

export default SharedTabsView;