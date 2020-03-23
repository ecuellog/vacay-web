import React from 'react';
import { fetchCreatedTabs } from '../../store/actions/tabs';
import { connect } from 'react-redux';
import TabItem from '../TabItem/TabItem';
import { Modal } from 'react-bootstrap';
import './TabList.scss';

class TabList extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      showCreateModal: false,
      persons: [this.props.currentUserName],
      newPerson: '',
      tabName: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleCreateModalClose = this.handleCreateModalClose.bind(this);
    this.handleCreateModalShow = this.handleCreateModalShow.bind(this);
    this.handleAddPerson = this.handleAddPerson.bind(this);
  }

  componentDidMount() {
    this.props.fetchCreatedTabs();
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCreateModalClose() {
    this.setState({
     ...this.state,
     showCreateModal: false
    });
  }

  handleCreateModalShow() {
    this.setState({
     ...this.state,
     showCreateModal: true
    });
  }

  handleAddPerson(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      ...this.state,
      persons: [...this.state.persons, prevState.newPerson],
      newPerson: ''
    }));
  }
  
  render() {
    const {
      handleCreateModalClose,
      handleCreateModalShow,
      handleAddPerson,
      handleInput
    } = this;
    const { showCreateModal, persons, newPerson, tabName } = this.state;
    return (
      <div className="container-tab-list py-3">
        <div>
          { this.props.tabs.map((tab) => 
            <TabItem tab={tab} key={tab._id}/>
          )}
        </div>
        <button className="btn btn-primary btn-float-action" onClick={handleCreateModalShow}>
          <i className="fas fa-plus"></i>
        </button>

        <Modal show={showCreateModal} onHide={handleCreateModalClose}>
          <Modal.Body>
            <h4 className="mb-4">Create Tab</h4>
            <form>
              <div className="form-group">
                <label className="mb-0">Tab name</label>
                <input className="form-control mb-3" name="tabName" placeholder="The Moon 2045" value={tabName} onChange={handleInput}></input>
                <label className="mb-0">People</label>
                <div className="d-flex justify-content-between">
                  <input className="form-control" name="newPerson" placeholder="Joe Smith" value={newPerson} onChange={handleInput}></input>
                  <button className="btn btn-outline-primary ml-3" onClick={handleAddPerson}>Add</button>
                </div>
                <div>
                  { persons.map((person, index) => 
                    <span key={index}>{person}</span>
                  )}
                </div>
                <button type="button" className="btn btn-primary float-right mt-5">Save</button>
                <button type="button" className="btn btn-secondary float-right mt-5 mr-3">Cancel</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCreatedTabs: () => dispatch(fetchCreatedTabs())
  }
}

function mapStateToProps(state) {
  return {
    tabs: state.tabs.tabs,
    currentUserName: state.auth.user.name
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabList);