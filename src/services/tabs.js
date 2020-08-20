import { api } from '../index';

export default class TabsService {
  static getCreated() {
    return api.get('/api/ledgers/created', { withCredentials: true });
  }

  static getShared() {
    return api.get('/api/ledgers/shared', { withCredentials: true });
  }

  static create(tab) {
    return api.post('/api/ledgers', tab, { withCredentials: true });
  }

  static get(tabId) {
    return api.get(`/api/ledgers/${tabId}`, { withCredentials: true });
  }
}
