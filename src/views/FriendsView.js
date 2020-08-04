import React from 'react';
import SideBarViewContainerBase from '../components/SideBarViewContainerBase/SideBarViewContainerBase';
import SideBarMain from '../components/SideBarMain/SideBarMain';

function FriendsView() {
  return (
    <SideBarViewContainerBase sidebar={<SideBarMain/>}>
      <h1>FriendsView</h1>
    </SideBarViewContainerBase>
  );
}

export default FriendsView;