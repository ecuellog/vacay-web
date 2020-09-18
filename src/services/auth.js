import { api } from '../index';

export default class AuthService {
  static login(email, password) {
    return api.post('/auth/login',
      {
        email,
        password
      },
      { withCredentials: true }
    );
  }

  static register(name, email, password) {
    return api.post('/auth/register',
      {
        name,
        email,
        password
      },
      { withCredentials: true }
    )
  }

  static getCurrentAuthUser() {
    return api.get('/users/current',
      { withCredentials: true }
    );
  }

  static logout() {
    return api.get('/auth/logout',
      { withCredentials: true }
    )
  }
}
