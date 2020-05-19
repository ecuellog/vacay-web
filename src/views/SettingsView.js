import React from 'react';
import SideBarViewContainerBase from '../components/SideBarViewContainerBase/SideBarViewContainerBase';
import SideBarMain from '../components/SideBarMain/SideBarMain';

export default function SettingsView() {
  return (
    <SideBarViewContainerBase sidebar={<SideBarMain/>}>
      <h1>SettingsView</h1>
    </SideBarViewContainerBase>
  );
}