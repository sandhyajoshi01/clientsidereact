import React, {Component} from 'react';
import {Card, Button, CardImg, CardTitle, CardSubtitle, CardBody, CardGroup} from 'reactstrap';
import {Row, Col} from 'react-flexbox-grid';
import UserService from '../Service/UserService';
import SearchBar from './SearchProduct';
import {withRouter} from 'react-router-dom';
import Cart from './Cart'

class ListProductsComponent extends Component{
    constructor(props) {
        super(props)
        this.state = {
            Products: [],
            quantity: 1,
            cart: [],
            Message: null
        }
        this.displayProducts = this.displayProducts.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    componentDidMount() {
        this.displayProducts();
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
                    cp.count += 1;
                    productAlreadyInCart = true;
                }
            });

            if (!productAlreadyInCart) {
                cart.push({...Product, count: 1});
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

    render() {
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
                                                <CardSubtitle>CA ${Product.proPrice}</CardSubtitle>
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
                        <Cart
                            cart={this.state.cart}
                            removeFromCart = {this.removeFromCart}
                        />
                    </div>
                </Row>

                    </>
                )
                }
                }

                export default withRouter(ListProductsComponent);