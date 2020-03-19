import { api } from '../index';

export default class AuthService {
  static login(email, password) {
    return api.post('/api/auth/login',
      {
        email,
        password
      },
      { withCredentials: true }
    );
  }

  static getCurrentAuthUser() {
    return api.get('/api/users/current',
      { withCredentials: true }
    );
  }
}
