import React, {Component} from 'react';
import {Card, Button, CardImg, CardTitle, CardSubtitle, CardBody, CardGroup} from 'reactstrap';
import {Row, Col} from 'react-flexbox-grid';
import UserService from '../Service/UserService';
import SearchBar from './SearchProduct';
import {withRouter} from 'react-router-dom';
import Cart from './Cart'
import checkout from "./Checkout";
import {User} from "../Models/UserModel";
import {count} from "rxjs/operators";

class ListProductsComponent extends Component{
    constructor(props) {
        super(props)
        this.state = {
            Products: [],
            //quantity: 0,
            cart: [],
            checkoutButton: false,
            Message: null,
            Total:0,
            currentUser: new User()
        }
        this.displayProducts = this.displayProducts.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.checkout=this.checkout.bind(this);
        this.totalPrice=this.totalPrice.bind(this);
        this.pushtocart=this.pushtocart.bind(this);
    }


    componentDidMount() {
        this.displayProducts();
        UserService.currentUser.subscribe(data => {
            console.log(data)
            this.setState({
                currentUser: data
            })
        });
    }
    checkout(state, callback) {
        //console.log("cart right now as props",this.props.cart)
        //console.log("cart to be sent as props",this.state.cart)

        if (!this.state.currentUser) {
            this.setState({Message: "You should login in to checkout"});
        }
        else {
            debugger
            let cartarray = [...this.state.cart]
            console.log("access quantity",cartarray.splice(-1))
            console.log(cartarray.splice(-1)[0])
            this.props.history.push('/checkout',{cartprop:this.state.cart,totalPrice:this.state.Total})
        }
        /*let order = new Order(this.state.currentUser,this.state.cart)
        UserService.saveOrder(order)
            .then(
                data=>{
                    this.props.history.push('/checkout')
                },
                error => {
                    this.setState({errorMessage: "Order not saved"})
                }
            )*/
    }


    displayProducts() {
        UserService.getAllProducts().then(
            response => {
                this.setState({Products: response.data})
            }
        )

    }

    addToCart = (Product) => {
        this.setState(state => {
            const cart = state.cart;
            let productAlreadyInCart = false;

            cart.forEach(cp => {
                if (cp.product_ID === Product.product_ID) {
                    //cp.qty= this.getQuantityForItem;
                    productAlreadyInCart = true;
                }
            });

            if (!productAlreadyInCart) {
                cart.push({...Product,qty:1});
            }

            localStorage.setItem("cartItems", JSON.stringify(cart));
            return {cart: cart};
        });

    };

    removeFromCart = (product) => {
        this.setState(state=> {
            const cartItem = this.state.cart.filter(a => a.product_ID !== product.product_ID);
            localStorage.setItem("cartItem", JSON.stringify(cartItem));
            return {cart: cartItem};
        });

    };
    totalPrice=(AllTotal)=>{
        //debugger
        this.setState({Total:AllTotal},()=>{console.log(this.state.Total)})
    }
    getQuantityForItem = (quantity,productID) =>{
        debugger
        //this.setState({quantity:quantity});
        //this.state.cart.slice(-1).quantity=quantity;
        //this.setState({quantity:quantity})
        this.setState(state => {
            const cart = state.cart;

            cart.forEach(cp => {
                if (cp.product_ID ===productID) {
                    cp.qty= quantity
                }
            });
            localStorage.setItem("cartItems", JSON.stringify(cart));
            return {cart: cart};
        });

    }
    pushtocart(quantity){
        this.state.cart.push({...this.state.cart,quantity})
    }



    render() {
        const {cart}= this.state.cart;
        let {ether}=0;
        return (
            <>
                <Row>
                    <SearchBar/>
                </Row>
                <Row>
                    {this.state.Products.map(Product =>
                        <Col>
                            <CardGroup style={{marginTop: "20px", marginBottom: "20px", marginRight: "10px"}}>
                                <Card style={{width: "30rem"}}>
                                    <Row className="ProductContainer">
                                        <Col md="4">
                                            <CardImg top width="100%" src={Product.proImageURL} alt={Product.proName}
                                                     style={{maxHeight: "350px"}}/>

                                            <Card key={Product.product_ID}/>
                                        </Col>
                                        <Col md="8">
                                            <CardBody>

                                                <CardTitle>{Product.proName}</CardTitle>
                                                <CardTitle>{Product.proBrand}</CardTitle>
                                                <CardSubtitle> {ether = (Product.proPrice *0.0031).toFixed(2)} Eth </CardSubtitle>
                                                {Product.proStock > 0 ?
                                                    <Button outline color="secondary" onClick={() => this.addToCart(Product)}>
                                                        Add to Cart</Button>
                                                    :
                                                    <p>Product is currently out of stock!</p>
                                                }
                                            </CardBody>
                                        </Col>
                                    </Row>

                                </Card>
                            </CardGroup>
                        </Col>
                    )}

                    <div className="col-md-3">
                        {/*{this.state.cart.map(item=>(*/}
                        <Cart
                            cart={this.state.cart}
                            value={0}
                            removeFromCart = {this.removeFromCart}
                            totalPrice = {this.totalPrice}
                            getQuantityForItem={this.getQuantityForItem}
                        />

                        {this.state.cart.length>0 ?
                            <div>
                                <div>
                                <checkout cartprop={this.state.cart} totalPrice={this.state.Total}/>
                                </div>
                                <h4><Button outline color="secondary" onClick={this.checkout}>Checkout</Button></h4>

                            </div>
                            : null

                        }
                    </div>

                </Row>

                    </>
                )
                }
                }
export default withRouter(ListProductsComponent);