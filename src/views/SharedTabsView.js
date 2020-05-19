import React from 'react';
import SideBarMain from '../components/SideBarMain/SideBarMain';
import SideBarViewContainerBase from '../components/SideBarViewContainerBase/SideBarViewContainerBase';

export default function SharedTabsView() {
  return (
    <SideBarViewContainerBase sidebar={<SideBarMain/>}>
      <h1>SharedTabsView</h1>
    </SideBarViewContainerBase>
  );
}