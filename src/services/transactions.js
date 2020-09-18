import { api } from '../index';

export default class TabsService {
  static getByTab(tabId) {
    return api.get(`/ledgers/${tabId}/transactions`,
      { withCredentials: true }
    );
  }

  static create(transaction) {
    return api.post(`/ledgers/${transaction.ledger}/transactions`,
      transaction,
      { withCredentials: true }
    );
  }
}
