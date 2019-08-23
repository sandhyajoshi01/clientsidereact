import axios from 'axios';
const API_URL = 'http://localhost:8080/api/user';

class UserService {
  getAllProducts(){
    return axios.get('http://localhost:8080/api/user/products') ;
  }
}
export default new UserService();
