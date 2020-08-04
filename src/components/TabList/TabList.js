import React, { useEffect, useState } from 'react';
import { fetchCreatedTabs, createTab } from '../../store/actions/tabs';
import { connect } from 'react-redux';
import TabItem from '../TabItem/TabItem';
import { Modal } from 'react-bootstrap';
import './TabList.scss';
import { toast } from 'react-toastify';

function TabList(props) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [persons, setPersons] = useState([props.currentUserName]);
  const [newPerson, setNewPerson] = useState('');
  const [tabName, setTabName] = useState('');

  useEffect(() => {
    props.fetchCreatedTabs();
  }, []);

  function handleCreateModalClose() {
    setShowCreateModal(false);
    setPersons([props.currentUserName]);
    setNewPerson('');
    setTabName('');
  }

  function handleCreateModalShow() {
    setShowCreateModal(true);
  }

  function handleAddPerson(e) {
    e.preventDefault();
    setPersons([...persons, newPerson]);
    setNewPerson('');
  }

  function handleCreateTab(e) {
    e.preventDefault();
    let tab = {
      name: tabName,
      persons: persons
    }
    props.createTab(tab);
    handleCreateModalClose();
    toast('Tab successfully created!');
  }

  return (
    <div className="container-tab-list pt-3 px-3">
      <div>
        { props.tabs.map((tab) => 
          <TabItem tab={tab} key={tab._id}/>
        )}
      </div>
      <button
        className="btn btn-primary btn-float-action"
        onClick={handleCreateModalShow}
      >
        <i className="fas fa-plus"></i>
      </button>

      <Modal show={showCreateModal} onHide={handleCreateModalClose}>
        <Modal.Body>
          <h4 className="mb-4">Create Tab</h4>
          <form>
            <div className="form-group">
              <label className="mb-0">Tab name</label>
              <input className="form-control mb-3" name="tabName" placeholder="The Moon 2045" value={tabName} onChange={(e) => setTabName(e.target.value)}></input>
              <label className="mb-0">People</label>
              <div className="d-flex justify-content-between">
                <input className="form-control" name="newPerson" placeholder="Joe Smith" value={newPerson} onChange={(e) => setNewPerson(e.target.value)}></input>
                <button className="btn btn-outline-primary ml-3" onClick={handleAddPerson}>Add</button>
              </div>
              <div>
                { persons.map((person, index) => 
                  <span key={index}>{person}</span>
                )}
              </div>
              <button
                type="button"
                className="btn btn-primary float-right mt-5"
                onClick={handleCreateTab}
              >Save</button>
              <button
                type="button"
                className="btn btn-secondary float-right mt-5 mr-3"
                onClick={handleCreateModalClose}
              >Cancel</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
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