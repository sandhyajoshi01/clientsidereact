import React, {Component, useContext} from "react";
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import {withRouter} from 'react-router-dom';
import UserService from "../Service/UserService";
import {User} from "../Models/UserModel";
import {Transaction} from "../Models/Transaction";
import Web3 from "web3";


class checkout extends Component{
    constructor(props){
        super(props);
        this.state={
            user: new User(),
            //products: this.props.product,
            submitted : false,
            errorMessage:'',
            id: this.props.match.params.id,
            ethereumMessage:'',
            accounts:'',
            web3InUse:'',
            transMessage:''
            //product: JSON.parse(localStorage.getItem('currentProduct')),
            //cart:JSON.parse(localStorage.getItem('cart'))
        }
        this.placeOrder= this.placeOrder.bind(this);
    }

    handleChange(e){
        const {name, value}=e.target;   // target element<tags>
        const user= this.state.user;
        user[name]=value;
        this.setState({user: user});
    }

    componentDidMount() {
        window.addEventListener('load', async () => {
            debugger
            const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
            this.setState({web3InUse: web3})
            console.log("web3",web3)
            const network = await web3.eth.net.getNetworkType();
            console.log(network)

            const accounts = await web3.eth.getAccounts()
            // const accounts = await web3.eth.accounts[0]
            this.setState({accounts:accounts[0]})
        })

        UserService.currentUser.subscribe(data => {
            //console.log(data)
            this.setState({
                user: data
            })
        });


    }

    placeOrder(e){
        e.preventDefault();
        this.setState({submitted: true});
        const user= this.state.user;
        const currentDateTime = new Date();
        user.etherAddress = this.state.accounts;
        if (!(user.firstname && user.lastname && user.billingAddress && user.etherAddress)) {
            return;
        }
        const paymentAddress="0x5378fa11529725cCC491bB6708f9E2F06a1639d5";
        const amtToPay= this.props.location.state.totalPrice;
        this.state.web3InUse.eth.sendTransaction({
            from: user.etherAddress,
            to: paymentAddress,
            value: this.state.web3InUse.utils.toWei(amtToPay.toString(), 'ether')
        }, (err, transactionId) => {
            if  (err) {
                this.setState({ethereumMessage:"Payment failed!"})
                console.log('Payment failed', err)

            } else {
                this.setState({ethereumMessage:"Payment succeessful!"})
                console.log('Payment successful', transactionId)
                const transaction = new Transaction(user,transactionId)
                UserService.buyProducts(transaction)
                    .then(
                        data => {
                            this.setState({transMessage:"transaction saved!"})
                        },
                        error => {
                            if(error.response.status === 409){
                                this.setState({
                                    transMessage: "transaction not saved!"
                                });
                            }else{
                                this.setState({
                                    transMessage: "Unexpected error occurred"
                                });
                            }
                        }
                    );

            }
        })
        this.props.history.push('/')
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
                                <div className={'form-group' + (submitted && user.billingAddress ? 'has-error': '')}>
                                    <MDBInput label="Billing Address" group type="text"
                                              name="billingAddress" value={user.billingAddress}
                                              onChange={(e)=>this.handleChange(e)}/>
                                    {submitted && !user.billingAddress &&
                                    <div className="alert alert-danger" role="alert"> Billing Address is required
                                    </div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && user.etherAddress ? 'has-error': '')}>
                                    <MDBInput label="Ether Address: " group type="text"
                                              name="etherAddress" value={this.state.accounts}
                                              onChange={(e)=>this.handleChange(e)}/>
                                    {submitted && !user.etherAddress &&
                                    <div className="alert alert-danger" role="alert"> Ether Address is required
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
                                {/*<p className="font-small grey-text d-flex justify-content-center">
                                    Want to add more items to your cart?
                                    <a
                                        className="dark-grey-text font-weight-bold ml-1"
                                    >
                                        Your Cart
                                    </a>
                                </p>*/}
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    };

}
export default withRouter(checkout);
