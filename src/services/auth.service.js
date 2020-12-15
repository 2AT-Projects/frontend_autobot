import axios from 'axios';

// const API_URL = 'https://api-ufaautoapp.herokuapp.com/api/auth/';
const API_URL = 'http://localhost:8080/api/auth/'

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      password: user.password,
      bank: user.bank,
      bank_number: user.bank_number,
      know_me: user.know_me,
    });
  }
}

export default new AuthService();
