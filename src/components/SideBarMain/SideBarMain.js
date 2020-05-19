import React from 'react';

import { NavLink } from 'react-router-dom';
import ActionClickLogout from '../ActionClickLogout/ActionClickLogout';

function SideBarMain(props) {
  return (
    <>
      <NavLink className="link" activeClassName="active" to="/tabs">Your Tabs</NavLink>
      <NavLink className="link" activeClassName="active" to="/sharedtabs">Shared Tabs</NavLink>
      <NavLink className="link" activeClassName="active" to="/friends">Friends</NavLink>
      <NavLink className="link" activeClassName="active" to="/settings">Settings</NavLink>
      <div className="flex-grow-1 d-flex align-items-end mb-3">
        <ActionClickLogout className="link "/>
      </div>
    </>
  );
}

export default SideBarMain;