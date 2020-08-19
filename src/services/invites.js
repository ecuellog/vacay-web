import { api } from '../index';

export default class InvitesService {
  static acceptInvite(inviteId) {
    return api.get(`/api/invites/${inviteId}/accept`, {
      withCredentials: true
    });
  }
}
