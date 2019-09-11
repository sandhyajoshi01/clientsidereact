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
import {faUserPlus,faKey,faUser,faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class signup extends Component{
  constructor(props){
   super(props);
   this.state={
   user : new User('','','','',''),
   submitted : false,
   errorMessage:''
   };
 }
   handleChange(e){
   const {name, value}=e.target;
   const user= this.state.user;
   user[name]=value;
   this.setState({user: user});
   }
  handleRegister(e){
      e.preventDefault();
	  this.setState({submitted: true});
      const{user}=this.state;

      UserService.registerUser(user)
      .then(
	  data => {
          this.props.history.push('./login');
      },
      error => {
        if(error.response.status === 409){
          this.setState({
            errorMessage: "Username is not available"
          });
        }else{
          this.setState({
            errorMessage: "Unexpected error occurred"
          });
        }
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
                          Sign Up
                          <FontAwesomeIcon icon={faUserPlus}  fixedWidth/>
                      </h3>
					  </MDBRow>
					  </div>
					   {errorMessage &&
						<div className="alert alert-danger" role="alert">
						<strong>Error! </strong> {errorMessage}
						</div>
					   }
                  <MDBCardBody className="mx-4 mt-4" >
				  <div className={'form-group' + (submitted && user.firstname ? 'has-error': '')}>
                      <FontAwesomeIcon icon={faUser} fixedWidth/>
                  <MDBInput label="First Name" group type="text"
                  name="firstname" value={user.firstname}
                   onChange={(e)=>this.handleChange(e)}/>
				   {submitted && !user.firstname &&
					<div className="alert alert-danger" role="alert">First Name is required
					</div>
					}
				   </div>
				   <div className={'form-group' + (submitted && user.lastname ? 'has-error': '')}>
                       <FontAwesomeIcon icon={faUser} fixedWidth/>
                  <MDBInput label="Last Name" group type="text"
                  name="lastname" value={user.lastname}
                  onChange={(e)=>this.handleChange(e)}/>
				   {submitted && !user.lastname &&
					<div className="alert alert-danger" role="alert">Last Name is required
					</div>
					}
				  </div>
				  <div className={'form-group' + (submitted && user.email ? 'has-error': '')}>
                      <FontAwesomeIcon icon={faEnvelopeOpen} fixedWidth />
                  <MDBInput label="Email" group type="text"
                    name="email" value={user.email}
                    onChange={(e)=>this.handleChange(e)}/>
					 {submitted && !user.email &&
					<div className="alert alert-danger" role="alert"> Email is required
					</div>
					}
					</div>
					 <div className={'form-group' + (submitted && user.username ? 'has-error': '')}>
                         <FontAwesomeIcon icon={faUser} fixedWidth/>
                    <MDBInput label="Pick a username" group type="text"
                    name="username" value={user.username}
                     onChange={(e)=>this.handleChange(e)}/>
					  {submitted && !user.username &&
						<div className="alert alert-danger" role="alert">Username is required
						</div>
					}
					</div>
					<div className={'form-group' + (submitted && user.password ? 'has-error': '')}>
                        <FontAwesomeIcon icon={faKey} fixedWidth />
                    <MDBInput
                      label="Create a password"
                      group type="password"
                      containerClass="mb-0"
                      name="password" value={user.password}
                      onChange={(e)=>this.handleChange(e)}
                    />
					{submitted && !user.password &&
					<div className="alert alert-danger" role="alert">Password is required.</div>
					}
					</div>
                    <div className="text-center mb-4 mt-5">
                      <MDBBtn
                        color="danger"
                        type="button"
                        className="btn-block z-depth-2"
                       onClick={(e) => this.handleRegister(e)}
                      >
                        Sign up
                      </MDBBtn>
					</div>
                    <p className="font-small grey-text d-flex justify-content-center">
                      Already have an account?
                      <a
                        href="./login"
                        className="dark-grey-text font-weight-bold ml-1"
                       >
                       Login
                      </a>
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
    );
  };
};
export default signup;
