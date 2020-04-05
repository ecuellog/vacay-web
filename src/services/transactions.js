import { api } from '../index';

export default class TabsService {
  static getByTab(tabId) {
    return api.get(`/api/ledgers/${tabId}/transactions`,
      { withCredentials: true }
    );
  }
}