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
            inputValue: this.props.value,
            errorMessage:"",
            Total:0,
            id: this.props.match.params.id,
            product: JSON.parse(localStorage.getItem('currentProduct')),
            currentUser: new User()
        }
        this._handleUpdate = this._handleUpdate.bind(this);
        //this._reset = this._reset.bind(this);
        //this.checkout = this.checkout.bind(this);
        //this.totalPrice= this.totalPrice.bind(this);

    }

    //for the quantity part
    _handleUpdate(e){
        if(e.target.value>0){this.setState({inputValue: e.target.value});}
        //this.props.getQuantityForItem(this.state.inputValue+1);
    }


   /* _reset() {
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


    render() {
        const {cart,errorMessage,totalPrice} = this.props;
        let Totalforitem,AllTotal = 0;
        //let quantity= target.value;
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
                                        <CardTitle>{itemincart.proName}</CardTitle>
                                        <CardTitle>{itemincart.proBrand}</CardTitle>
                                        <CardSubtitle>{Math.round((itemincart.proPrice*0.0031)*100)/100} ETH</CardSubtitle>
                                        <div>
                                            <input type="number" value={this.state.inputValue}
                                                   onChange={this._handleUpdate}
                                                   /*{()=>this.props.getQuantityForItem(this.state.inputValue,itemincart.product_ID)}*/
                                                   step="any"
                                                   placeholder="Quantity" style={{width: "100px"}}/>

                                        </div>
                                        <div>
                                            <h6>SubTotal:{Totalforitem =
                                                Math.round((this.state.inputValue * itemincart.proPrice*0.0031)*100)/100} ETH </h6>
                                            <h6><Button outline color="secondary"
                                                        onClick={()=>this.props.removeFromCart(itemincart)}>Remove</Button></h6>
                                        </div>
                                        <div style={{display: "None"}}>{AllTotal += Totalforitem}</div>

                                    </CardBody>

                                </Card>

                            </div>))
                        }
                        <div className="commonContainer" >
                            {console.log(Math.round(3.07*2*100)/100)}
                            {AllTotal>0?
                                <h4>Total: {Math.round(AllTotal*100)/100} ETH</h4> :null}
                            <Button outline color="secondary" onClick={()=>this.props.totalPrice(AllTotal)}> Confirm purchase </Button>

                        </div>
                    </div>
                    }

                </div>
            </>

        );
    }
}
export default withRouter(Cart);
