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
      debugger
  return axios.post(API_URL+'/signup', JSON.stringify(user),
      {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }
  loginUser(user){
      const headers = {
          authorization: 'Basic ' + btoa(user.username + ':' + user.password)
      };
      debugger
      return axios.get(API_URL+'/login', {headers: headers})
        .then(response =>{
            console.log(response)
            if(response.data.code == 200) {
                console.log("Login successful");
            }
            //store and subscribe
            localStorage.setItem('currentUser',JSON.stringify(response.data));
            currentUserSubject.next(response.data);
        });
  }

  logoutUser(user){
      //remove and unsubscribe
    return axios.post(API_URL+'/logout',{})
        .then(response=> {
          localStorage.removeItem('currentUser');
          currentUserSubject.next(null);
        });
  }
  buyProducts(transaction) {
        return axios.post(API_URL + '/purchase', JSON.stringify(transaction),
            {headers: {"Content-Type":"application/json; charset=UTF-8"}}
          );
  }
  saveOrder(order){
      return axios.post(API_URL+"/saveorder",JSON.stringify(order),
          {headers: {"Content-Type":"application/json; charset=UTF-8"}}
          );
  }
}
export default new UserService();
