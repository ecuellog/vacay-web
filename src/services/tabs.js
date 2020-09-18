import { api } from '../index';

export default class TabsService {
  static getCreated() {
    return api.get('/ledgers/created', { withCredentials: true });
  }

  static getShared() {
    return api.get('/ledgers/shared', { withCredentials: true });
  }

  static create(tab) {
    return api.post('/ledgers', tab, { withCredentials: true });
  }

  static get(tabId) {
    return api.get(`/ledgers/${tabId}`, { withCredentials: true });
  }
}
