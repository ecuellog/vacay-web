import React from 'react';
import SideBarViewContainerBase from '../components/SideBarViewContainerBase/SideBarViewContainerBase';
import SideBarMain from '../components/SideBarMain/SideBarMain';

function SettingsView() {
  return (
    <SideBarViewContainerBase sidebar={<SideBarMain/>}>
      <h1>SettingsView</h1>
    </SideBarViewContainerBase>
  );
}

export default SettingsView;