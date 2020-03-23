import React from 'react';
import './NavBar.scss';
import Logo from '../../assets/images/logov2_200x200.png';

function NavBar(props) {
  return (
    <div className="component-nav-bar">
      <div className="container-fluid">
        <img src={Logo}></img>
      </div>
    </div>
  );
}

export default NavBar;