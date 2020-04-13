import React from 'react';
import './DotNav.scss';

function DotNav(props) {
  function handleLinkClick(e, link) {
    e.preventDefault();
    props.handleLinkClick(link);
  }

  return (
    <div className="dotnav-component mt-5">
      <div className="dotstyle dotstyle-fillup">
        <ul>
          {props.links.map(link => (
            <li
              className={link === props.currentLink ? "current":""}
            >
              <a
                href="#"
                onClick={(e) => handleLinkClick(e, link)}
              >{link}</a>
            </li>
          )
          )}
        </ul>
      </div>
    </div>
  );
}

export default DotNav;