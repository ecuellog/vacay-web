import React, { useEffect, useState } from 'react';
import { fetchCreatedTabs, createTab } from '../../store/actions/tabs';
import { connect } from 'react-redux';
import TabItem from '../TabItem/TabItem';
import './TabList.scss';
import ModalTabAdd from '../ModalTabAdd/ModalTabAdd';

function TabList(props) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    props.fetchCreatedTabs();
  }, []);

  return (
    <div className="container-tab-list pt-3 px-3">
      <div>
        { props.tabs.map((tab) => 
          <TabItem tab={tab} key={tab._id}/>
        )}
      </div>
      <div className="container-btn-float-action">
        <button
          className="btn btn-primary btn-float-action"
          onClick={() => setShowCreateModal(true)}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <ModalTabAdd
        showModal={showCreateModal}
        handleModalHide={() => setShowCreateModal(false)}
      />
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCreatedTabs: () => dispatch(fetchCreatedTabs()),
    createTab: (tab) => dispatch(createTab(tab))
  }
}

function mapStateToProps(state) {
  return {
    tabs: state.tabs.tabs,
    currentUserName: state.auth.user.name
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabList);