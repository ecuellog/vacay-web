import axios from 'axios';

export default class AuthService {
  static login(email, password) {
    return axios.post('http://localhost:3000/api/auth/login', {
      email,
      password
    });
  }
}
