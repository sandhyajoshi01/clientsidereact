import axios from 'axios';
import UserService from "./UserService";
const API_URL ='http://localhost:8080/api/admin';

class AdminService{


  deleteProduct(){
    return axios.delete(`${API_URL}/deleteProduct/${this.state}`);
  }

}
export default new AdminService();