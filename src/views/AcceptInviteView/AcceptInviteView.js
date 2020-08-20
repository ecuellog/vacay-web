import React, { useState } from 'react';
import InvitesService from '../../services/invites';
import { toast } from 'react-toastify';
import { withRouter, useHistory } from 'react-router-dom';

function AcceptInviteView(props) {
  let history = useHistory();
  const inviteId = props.match.params.inviteId;

  InvitesService.acceptInvite(inviteId)
    .then(res => {
      toast(res.data.message);
      history.push('/sharedtabs');
    })
    .catch(err => {
      toast.error('Unable to accept invite, please try again.');
      history.push('/tabs');
    });
  return <div>accept invite</div>;
}

export default withRouter(AcceptInviteView);
