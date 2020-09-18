import { api } from '../index';

export default class InvitesService {
  static acceptInvite(inviteId) {
    return api.get(`/invites/${inviteId}/accept`, {
      withCredentials: true
    });
  }
}
