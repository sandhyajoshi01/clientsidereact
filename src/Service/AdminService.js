import axios from 'axios';
const API_URL ='http://localhost:8080/api/admin';

class AdminService{
state={}

  deleteProduct(){
    return axios.delete(`${API_URL}/deleteProduct/${this.state}`);
  }

}
export default new AdminService();