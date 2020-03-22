import React from 'react';
import './SideBarViewContainer.scss';
import SideBar from '../SideBar/SideBar';

function SideBarViewContainer(props) {
  return (
    <div className="container-fluid side-bar-view-container-component">
      <div className="row">
        <div className="col-3 col-xl-2 sidebar-container">
          <SideBar></SideBar>
        </div>
        <div className="col">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default SideBarViewContainer;