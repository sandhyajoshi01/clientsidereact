import React,{Component} from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";
import UserService from '../Service/UserService';
import {User} from '../Models/UserModel';
import { faSignInAlt,faUserAlt,faKey} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class login extends Component{
  constructor(props) {
    super(props);

    //redirect to home if already logged in
    if (UserService.currentUserValue) {
      this.props.history.push('/');
    }
    this.state = {
      user: new User('', '','','','','','','',
          ''),
      errorMessage: '',
      submitted: false,
      message:''
    };
  }
    handleChange(e){
      const {name, value}=e.target;   // target element<tags>
      const user= this.state.user;
      user[name]=value;
      this.setState({user: user});
      // console.log(e); // events can be seen in the browser console
    }
    handleLogin(e){
    debugger
      e.preventDefault();
      this.setState({submitted: true});
      const{user}=this.state;

      if (!(user.username && user.password)) {
        return;
      }

      UserService.loginUser(user)
          .then(
              data => {
                debugger
                console.log(data)  ///data undefined aairachha
                this.props.history.push('/');
                this.setState({message:"You are logged in."})
                console.log(this.state.message);
              },
              error => {
                this.setState({ errorMessage: "Username or password is not valid."});
              }
          );

    }

  render(){
    const {user, submitted, errorMessage} = this.state;
  return (

    <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <MDBCard>
                <div className="header pt-3 grey lighten-2">
                  <MDBRow className="d-flex justify-content-start">
                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                      Login
                      <FontAwesomeIcon icon={faSignInAlt} fixedWidth/>
                    </h3>
                  </MDBRow>
                </div>
                {errorMessage &&
                <div className="alert alert-danger" role="alert">
                  <strong>Error! </strong> {errorMessage}
                </div>
                }
                <MDBCardBody className="mx-4 mt-4">
                  <div className={'form-group' + (submitted && user.username ? 'has-error': '')}>
                    <FontAwesomeIcon icon={faUserAlt} size="sm"/>
                    <MDBInput label=" Username" group type="text"
                              name="username" value={user.username}
                              onChange={(e)=>this.handleChange(e)} />
                    {submitted && !user.username &&
                    <div className="alert alert-danger" role="alert">Username is required
                    </div>
                    }
                  </div>
                  <div className={'form-group' + (submitted && user.password ? 'has-error': '')}>
                    <FontAwesomeIcon icon={faKey} size="sm" />
                  <MDBInput
                    label="Password"
                    group
                    type="password"
                    validate
                    containerClass="mb-0"
                    name="password" value={user.password}
                    onChange={(e)=>this.handleChange(e)}/>
                    {submitted && !user.username &&
                    <div className="alert alert-danger" role="alert">Password is required
                    </div>
                    }

                  <p className="font-small grey-text d-flex justify-content-end">
                    Forgot
                    <a
                      href="#!"
                      className="dark-grey-text font-weight-bold ml-1"
                    >
                      Password?
                    </a>
                  </p>
                  </div>
                  <div className="text-center mb-4 mt-5">
                    <MDBBtn
                      color="danger"
                      type="button"
                      className="btn-block z-depth-2"
                      onClick={(e) => this.handleLogin(e)}
                    >
                      Login
                    </MDBBtn>
                  </div>
                  <p className="font-small grey-text d-flex justify-content-center">
                    Don't have an account?
                    <a
                      href="./signup"
                      className="dark-grey-text font-weight-bold ml-1"
                    >
                      Sign up
                    </a>
                  </p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
  );
};
}


export default login;