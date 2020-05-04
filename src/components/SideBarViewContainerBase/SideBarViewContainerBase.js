import React from 'react';
import './SideBarViewContainerBase.scss';

function SideBarViewContainerBase(props) {
  return (
    <div className="container-fluid side-bar-view-container-component">
      <div className="row d-flex">
        <div className="sidebar-container">
          {props.sidebar}
        </div>
        <div className="flex-grow-1">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default SideBarViewContainerBase;