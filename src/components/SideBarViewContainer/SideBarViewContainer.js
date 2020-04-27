import React from 'react';
import './SideBarViewContainer.scss';
import SideBar from '../SideBar/SideBar';

function SideBarViewContainer(props) {
  return (
    <div className="container-fluid side-bar-view-container-component">
      <div className="row d-flex">
        <div className="sidebar-container">
          <SideBar></SideBar>
        </div>
        <div className="flex-grow-1">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default SideBarViewContainer;