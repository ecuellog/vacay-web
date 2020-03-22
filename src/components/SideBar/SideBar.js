import React from 'react';
import './SideBar.scss';

import { Link } from 'react-router-dom';
import ActionClickLogout from '../ActionClickLogout/ActionClickLogout';

function SideBar(props) {
  return (
    <div className="component-side-bar">
      <Link to="/tabs">Your Tabs</Link>
      <Link to="/sharedtabs">Shared Tabs</Link>
      <Link to="/friends">Friends</Link>
      <Link to="/settings">Settings</Link>
      <ActionClickLogout/>
    </div>
  );
}

export default SideBar;