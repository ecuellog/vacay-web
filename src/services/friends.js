import { api } from '../index';

export default class FriendsService {
  static getFriendsOf() {
    return api.get('/api/friends',
      { withCredentials: true }
    );
  }
}
