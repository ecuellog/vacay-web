import React from 'react';
import TabDetails from '../../components/TabDetails/TabDetails';
import { getTab } from '../../store/actions/tabs';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import './TabDetailView.scss';
import SideBarTabView from '../../components/SideBarTabView/SideBarTabView';
import SideBarViewContainerBase from '../../components/SideBarViewContainerBase/SideBarViewContainerBase';

class TabDetailView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const tabId = this.props.match.params.tabId;
    this.props.getTab(tabId);
  }
  
  render() {
    return (
      <SideBarViewContainerBase sidebar={<SideBarTabView/>}>
        <div className="container-tab-detail-view row">
          <div className="col-6">
            <TabDetails/>
          </div>
          <div className="col-6">
            <TabDetails/>
          </div>
        </div>
      </SideBarViewContainerBase>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getTab: (tabId) => dispatch(getTab(tabId))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(TabDetailView));