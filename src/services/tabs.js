import { api } from '../index';

export default class TabsService {
  static getCreated() {
    return api.get('/api/ledgers/created',
      { withCredentials: true }
    );
  }
}
