import React, {Component} from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Badge
} from 'reactstrap';
import {User} from '../Models/UserModel';
import {Transaction} from '../Models/Transaction';
import UserService from "../Service/UserService";
import {withRouter} from 'react-router-dom';
import checkout from "./Checkout";
import {Order} from "../Models/Order";


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Products: [],
            inputValue: "",
            errorMessage:"",
            id: this.props.match.params.id,
            product: JSON.parse(localStorage.getItem('currentProduct')),
            currentUser: new User()
        }
        this._handleUpdate = this._handleUpdate.bind(this);
        //this._reset = this._reset.bind(this);
        this.checkout = this.checkout.bind(this);
    }

    //for the quantity part
    _handleUpdate(e) {
        if (e.target.value >= 0) {
            this.setState({inputValue: e.target.value});
        }
    }

//for the quantity part
    /*_reset() {
        this.setState({inputValue: ""});
    }*/

    componentDidMount() {
        UserService.currentUser.subscribe(data => {
            console.log(data)
            this.setState({
                currentUser: data
            })
        });
    }

    checkout(state, callback) {
        console.log(this.state.product)

        if (!this.state.currentUser) {
            this.setState({errorMessage: "You should login in to checkout"});
        }
        else{
            let order = new Order(this.state.currentUser,this.state.product)
            UserService.saveOrder(order)
                .then(
                    data=>{
                        this.props.history.push('/checkout')
                    },
                    error => {
                        this.setState({errorMessage: "Order not saved"})
                    }
                )
        }

    }

    render() {
        const {cart,currentUser} = this.props;
        const {errorMessage,product} =this.state
        let Totalforitem = 0;
        let AllTotal = 0;
        return (
            <>
                <div className="alert alert-info">
                    {cart.length === 0 ? "Your cart is empty!" : <div> {cart.length} items in your cart. </div>}
                    {cart.length > 0 &&
                    <div>
                        {errorMessage &&
                        <div className="alert alert-danger" role="alert">
                            <strong> {errorMessage} </strong>
                        </div>
                        }
                        {cart.map(itemincart => (
                            <div>
                                <Card style={{marginTop: "20px", marginBottom: "20px", marginRight: "10px"}}>
                                    <CardImg top width="50%" src={itemincart.proImageURL}
                                             alt={itemincart.proName}
                                             style={{maxHeight: "200px", maxWidth: "200px"}}/>
                                    <CardBody style={{width: "40rem"}} key={itemincart.product_ID}>
                                        <CardTitle>Name: {itemincart.proName}</CardTitle>
                                        <CardTitle>Brand: {itemincart.proBrand}</CardTitle>
                                        <CardSubtitle>CA ${itemincart.proPrice}</CardSubtitle>
                                        <div>
                                            <input type="number" value={this.state.inputValue}
                                                   onChange={this._handleUpdate}
                                                   step="any"
                                                   placeholder="Quantity" style={{width: "100px"}}/>
                                        </div>
                                        <div>
                                            <h6>SubTotal: CA
                                                ${Totalforitem = this.state.inputValue * itemincart.proPrice}</h6>
                                            <h6><Button outline color="secondary"
                                                        onClick={()=>this.props.removeFromCart(itemincart)}>Remove</Button></h6>
                                        </div>
                                        <div style={{display: "None"}}>{AllTotal += Totalforitem}</div>
                                    </CardBody>

                                </Card>

                            </div>))
                        }
                        <div className="commonContainer">
                            <checkout product={this.state.product}/>
                            <h4>Total: CA ${AllTotal} </h4>
                            <h4><Button outline color="secondary" onClick={this.checkout}>Checkout</Button></h4>
                        </div>
                    </div>
                    }

                </div>
            </>

        );
    }
}
export default withRouter(Cart);
