import React from 'react';
import SideBarViewContainerBase from '../components/SideBarViewContainerBase/SideBarViewContainerBase';
import SideBarMain from '../components/SideBarMain/SideBarMain';


export default function FriendsView() {
  return (
    <SideBarViewContainerBase sidebar={<SideBarMain/>}>
      <h1>FriendsView</h1>
    </SideBarViewContainerBase>
  );
}