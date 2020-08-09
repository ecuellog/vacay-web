import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchFriends } from '../../store/actions/friends';
import { createTab } from '../../store/actions/tabs';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import * as _ from 'lodash';
import TransactionAddParticipantItem from '../TransactionAddParticipantItem/TransactionAddParticipantItem';
import InputDropdownSelect from '../InputDropdownSelect/InputDropdownSelect';

function ModalTabAdd(props) {
  const [participants, setParticipants] = useState([]);
  const [friendInput, setFriendInput] = useState('');
  const [tabName, setTabName] = useState('');

  useEffect(() => {
    props.fetchFriends();
  }, []);

  useEffect(() => {
    const selfFriend = props.friends.find(friend => friend.userId === props.currentUser._id);
    if (selfFriend) {
      setParticipants([{
        friend: selfFriend._id,
        invite: false
      }]);
    }
  }, [props.friends, props.currentUser, props.showModal])

  function isFriendInParticipants(friendId) {
    const participantsByFriendId = participants
      .filter(p => p.friend !== undefined)
      .map(p => p.friend)

    return participantsByFriendId.includes(friendId);
  }

  function generateFriendString(friend) {
    if (friend.userId === props.currentUser._id) {
      return `${friend.name} (You)`;
    }

    if (friend.email) {
      return `${friend.name} (${friend.email})`;
    }

    return `${friend.name} (no email)`;
  }

  function addNewParticipant() {
    setParticipants([
      ...participants,
      {
        name: friendInput,
        email: '',
        invite: false
      }
    ]);
    setFriendInput('');
  }

  function addFriendParticipant(friend) {
    setParticipants([
      ...participants,
      {
        friend: friend._id,
        invite: false
      }
    ]);
  }

  function changeParticipantProp(index, prop, propName) {
    let newParticipants = _.cloneDeep(participants);
    newParticipants[index][propName] = prop;
    setParticipants(newParticipants);
  }

  function deleteParticipant(index) {
    let newParticipants = _.cloneDeep(participants);
    newParticipants.splice(index, 1);
    setParticipants(newParticipants);
  }

  function handleCreateTab(e) {
    e.preventDefault();
    let tab = {
      name: tabName,
      participants: participants
    }
    props.createTab(tab)
      .then(() => {
        toast('Tab successfully created!');
        handleModalHide();
      })
      .catch((err) => {
        toast.error('There was an error creating the tab. Please try again.');
      });
  }

  function handleModalHide() {
    setParticipants([]);
    setFriendInput('');
    setTabName('');
    props.handleModalHide();
  }

  return (
    <Modal show={props.showModal} onHide={handleModalHide}>
      <Modal.Body>
        <h4 className="mb-4">Create Tab</h4>
        <form>
          <div className="form-group">
            <label className="mb-0">Tab name</label>
            <input className="form-control mb-3" name="tabName" placeholder="Mars 2055" value={tabName} onChange={(e) => setTabName(e.target.value)}></input>
            <label className="mb-0">Add participant</label>
            <InputDropdownSelect
              optionList={props.friends.filter(friend => !isFriendInParticipants(friend._id))}
              optionListToString={(op) => generateFriendString(op)}
              optionKey="_id"
              value={friendInput}
              onValueChange={value => setFriendInput(value)}
              actionOption={true}
              actionOptionString={`Add friend "${friendInput}"`}
              onActionOptionSelect={addNewParticipant}
              onSelect={friend => addFriendParticipant(friend)}
              emptyListMessage={'--'}
            />

            { participants.map((participant, index) => (
              <TransactionAddParticipantItem
                key={index}
                participant={participant}
                changeParticipantName={name => changeParticipantProp(index, name, "name")}
                changeParticipantEmail={email => changeParticipantProp(index, email, "email")}
                changeParticipantInvite={invite => changeParticipantProp(index, invite, "invite")}
                onDelete={() => deleteParticipant(index)}
              />
            ))}

            <button
              type="button"
              className="btn btn-primary float-right mt-5"
              onClick={handleCreateTab}
            >Save</button>
            <button
              type="button"
              className="btn btn-secondary float-right mt-5 mr-3"
              onClick={handleModalHide}
            >Cancel</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.auth.user,
    friends: state.friends.friends
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFriends: () => dispatch(fetchFriends()),
    createTab: (tab) => dispatch(createTab(tab))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalTabAdd);
