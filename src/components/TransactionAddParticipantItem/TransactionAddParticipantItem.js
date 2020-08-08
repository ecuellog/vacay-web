import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import Switch from '@material-ui/core/Switch';
import './TransactionAddParticipantItem.scss';

function TransactionAddParticipantItem(props) {
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    if (props.participant.friend) {
      let friend = props.friends.find(friend => friend._id === props.participant.friend);
      setFriend(friend);
    }
  }, [props.friends]);

  return (
    <div className="Component_TransactionAddParticipantItem p-3 my-3">
      {
        friend ? 
          <>
            <p>{friend.name}</p>
            <p>{friend.email}</p>
            <p>{props.participant.invite}</p>
            <button onClick={props.onDelete}>delete</button>
          </>
        :
          <>
            <div className="flex-grow-1">
              <input
                type="text"
                value={props.participant.name}
                onChange={e => props.changeParticipantName(e.target.value)}
                placeholder="Name"
                className="form-control w-100"
              ></input>
              <input
                type="text"
                value={props.participant.email}
                onChange={e => props.changeParticipantEmail(e.target.value)}
                placeholder="Email"
                className="form-control w-100 mt-2"
              ></input>
            </div>
            <div className="share-toggle-container d-flex flex-column justify-content-center">
              <label className="text-center">Share</label>
              <Switch
                checked={props.participant.invite}
                onChange={e => props.changeParticipantInvite(e.target.checked)}
              />
            </div>
            <button
              className="btn btn-blank delete-button"
              onClick={props.onDelete}
              type="button"
            >
              <i className="fas fa-times"></i>
            </button>
          </>
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.auth.user,
    friends: state.friends.friends
  }
}

export default connect(mapStateToProps)(TransactionAddParticipantItem);
