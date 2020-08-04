import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ActionClickLogout from '../ActionClickLogout/ActionClickLogout';
import * as _ from 'lodash';
import './SideBarTabView.scss';

function SideBarTabView(props) {
  const [tabId, setTabId] = useState(null);

  useEffect(() => {
    setTabId(_.get(props, 'tab._id'));
  });

  return (
    <>
      <NavLink className="link pl-3 mb-2" activeClassName="active" to="/tabs" exact>
        <i className="SideBarTabView--icon fas fa-arrow-left mr-2"></i>Back
      </NavLink>
      <NavLink
        className="link"
        activeClassName="active"
        to={`/tabs/${tabId}`}
        exact
      >
        Summary
      </NavLink>
      <NavLink
        className="link"
        activeClassName="active"
        to={`/tabs/${tabId}/transactions`}
      >
        Transactions
      </NavLink>
      <NavLink
        className="link"
        activeClassName="active"
        to={`/tabs/${tabId}/settings`}
      >
        Tab settings
      </NavLink>
      <div className="flex-grow-1 d-flex align-items-end mb-3">
        <ActionClickLogout className="link"/>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    tab: state.tabs.selectedTab,
  }
}

export default connect(mapStateToProps)(SideBarTabView);