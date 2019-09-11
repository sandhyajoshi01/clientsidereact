import React,{Component} from "react";
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import UserService from "../Service/UserService";
import {User} from "../Models/UserModel";

class checkout extends Component{
    constructor(props){
        super(props);
        this.state={ user : new User('','','','','','','',
            '',''),
            submitted : false,
            errorMessage:''
        }
    }
    handleChange(e){
        const {name, value}=e.target;   // target element<tags>
        const user= this.state.user;
        user[name]=value;
        this.setState({user: user});
        // console.log(e); // events can be seen in the browser console
    }
    placeOrder(e){
        e.preventDefault();
        this.setState({submitted: true});
        const{user}=this.state;

        if (!(user.firstname && user.lastname && user.address && user.creditCardNumber&& user.creditCardExpiry && user.creditCardSecurity)) {
            return;
        }

        UserService.buyProducts(user)
            .then(
                data => {
                    this.props.history.push('/');
                    this.setState({message:"Your item(s) will be delivered to your address in 2-3 business days"})
                    console.log(this.state);
                },
                error => {
                    console.log(error);
                    this.setState({ errorMessage: "Your information is not valid."});
                }
            );
        console.log(this.state);
    }
    render(){
        const {user, submitted, errorMessage} = this.state;
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardBody className="mx-6 mt-6" >
                                <div className={'form-group' + (submitted && user.firstname ? 'has-error': '')}>
                                    <MDBInput label="First Name" group type="text"
                                              name="firstname" value={user.firstname}
                                              onChange={(e)=>this.handleChange(e)}/>
                                    {submitted && !user.firstname &&
                                    <div className="alert alert-danger" role="alert">First Name is required
                                    </div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && user.lastname ? 'has-error': '')}>
                                    <MDBInput label="Last Name" group type="text"
                                              name="lastname" value={user.lastname}
                                              onChange={(e)=>this.handleChange(e)}/>
                                    {submitted && !user.lastname &&
                                    <div className="alert alert-danger" role="alert">Last Name is required
                                    </div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && user.address ? 'has-error': '')}>
                                    <MDBInput label="Address" group type="text"
                                              name="address" value={user.address}
                                              onChange={(e)=>this.handleChange(e)}/>
                                    {submitted && !user.address &&
                                    <div className="alert alert-danger" role="alert"> Address is required
                                    </div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && user.creditCardNumber ? 'has-error': '')}>
                                    <MDBInput label="Credit Card number" group type="text"
                                              name="creditCardNumber" value={user.creditCardNumber}
                                              onChange={(e)=>this.handleChange(e)}/>
                                    {submitted && !user.creditCardNumber &&
                                    <div className="alert alert-danger" role="alert"> Credit card number is required
                                    </div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && user.creditCardExpiry ? 'has-error': '')}>
                                    <MDBInput label="Credit Card Valid till" group type="text"
                                              name="creditCardExpiry" value={user.creditCardExpiry}
                                              onChange={(e)=>this.handleChange(e)}/>
                                    {submitted && !user.creditCardExpiry &&
                                    <div className="alert alert-danger" role="alert"> Credit card expiry date is required
                                    </div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && user.creditCardSecurity ? 'has-error': '')}>

                                    <MDBInput label="credit card security number" group type="text"
                                              name="creditCardSecurity" value={user.creditCardSecurity}
                                              onChange={(e)=>this.handleChange(e)}/>
                                    {submitted && !user.creditCardSecurity &&
                                    <div className="alert alert-danger" role="alert">Security number is required
                                    </div>
                                    }
                                </div>
                                <div className="text-center mb-4 mt-5">
                                    <MDBBtn
                                        color="danger"
                                        type="button"
                                        className="btn-block z-depth-2"
                                        onClick={(e) => this.placeOrder(e)}
                                    >
                                        Place Order
                                    </MDBBtn>
                                </div>
                                <p className="font-small grey-text d-flex justify-content-center">
                                    Want to add more items to your cart?
                                    <a
                                        href="./cart"
                                        className="dark-grey-text font-weight-bold ml-1"
                                    >
                                        Your Cart
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
export default checkout;
