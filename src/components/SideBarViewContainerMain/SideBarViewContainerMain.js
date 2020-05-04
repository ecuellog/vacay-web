import React from 'react';
import SideBarViewContainerBase from '../SideBarViewContainerBase/SideBarViewContainerBase';
import SideBarMain from '../SideBarMain/SideBarMain';

function SideBarViewContainerMain(props) {
  return (
    <SideBarViewContainerBase
      sidebar={<SideBarMain/>}
    >
      {props.children}
    </SideBarViewContainerBase>
  );
}

export default SideBarViewContainerMain;