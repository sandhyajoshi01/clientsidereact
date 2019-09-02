import axios from 'axios';
import {BehaviorSubject} from 'rxjs';

const API_URL = 'http://localhost:8080/api/user';
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));


class UserService {

  get currentUserValue() {
    return currentUserSubject.value;
  }
  get currentUser() {
    return currentUserSubject.asObservable();
  }
  getAllProducts(){
    return axios.get(API_URL+'/products') ;
  }
  registerUser(user){
  return axios.post(API_URL+'/signup', user);
  }
  loginUser(user){
    return axios.post(API_URL+'/login', user);
  }

  logoutUser(user){
    return axios.post(API_URL+'/logout',{})
        .then(response=> {
          localStorage.removeItem('currentUser');
          currentUserSubject.next(null);
        });
  }
}
export default new UserService();
