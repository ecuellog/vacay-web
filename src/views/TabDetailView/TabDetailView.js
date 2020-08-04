import React, { useEffect } from 'react';
import TabDetails from '../../components/TabDetails/TabDetails';
import { getTab } from '../../store/actions/tabs';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import './TabDetailView.scss';
import SideBarTabView from '../../components/SideBarTabView/SideBarTabView';
import SideBarViewContainerBase from '../../components/SideBarViewContainerBase/SideBarViewContainerBase';
import TransactionList from '../../components/TransactionList/TransactionList';

function TabDetailView(props) {
  useEffect(() => {
    const tabId = props.match.params.tabId;
    props.getTab(tabId);
  }, []);

  return (
    <SideBarViewContainerBase sidebar={<SideBarTabView/>}>
      <div className="container-tab-detail-view row no-gutters">
        <div className="col-xl-6 my-3">
          <TabDetails/>
        </div>
        <div className="col-6 transaction-list d-none d-xl-block mt-3">
          <TransactionList/>
        </div>
      </div>
    </SideBarViewContainerBase>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    getTab: (tabId) => dispatch(getTab(tabId))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(TabDetailView));