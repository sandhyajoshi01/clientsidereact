import React, {Component} from "react";
import {
    Card, CardBody,
    CardTitle, CardSubtitle, CardGroup, CardImg
} from 'reactstrap';
import UserService from "../Service/UserService";
import {Col, Row} from "react-flexbox-grid";
import NavbarHead from "./Navbar";
import './Navbar.css';


class PurchaseHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            currentUser: UserService.currentUserValue,
            transactions: []
        }
        this.getTransactions= this.getTransactions.bind(this);
    }

    componentDidMount() {
        if(!UserService.currentUserValue){
            this.props.history.push('/login');
            return;
        }
        this.getTransactions()
    }

    getTransactions(){

        debugger
        const userid = this.state.currentUser.user_id
        UserService.getAllTransactionHash(userid)
            .then(
                response => {
                    console.log(" tr response.data",response.data)
                    this.setState({transactions: response.data, message: "transactions displayed!"})
                },
                error => {
                    this.setState({message: "error occurred!"})
                }
            );

    }


    render() {
        return (
            <div className="container" backgroundColor="text-muted">
                <div><NavbarHead/></div>
                <div className="alert alert-info">
                {this.state.transactions ?
                    <h6>Click on the purchase-transaction hash to view details</h6>: null}
                {this.state.transactions.map(transaction =>
                    <Col>
                        <CardGroup style={{marginTop: "10px", marginBottom: "10px", marginRight: "10px"}}>
                            <Card style={{width: "20rem"}}>
                                <Row className="ProductContainer">
                                    <Card key={transaction.trid}/>
                                    <Col md="8">
                                        <CardBody>
                                            <Col md="4">
                                                <CardImg top width="100%" src={transaction.product.proImageURL} alt={transaction.product.proName}
                                                         style={{maxHeight: "350px"}}/>

                                                {/*<Card key={Product.product_ID}/>*/}
                                            </Col>
                                            <CardTitle>{transaction.product.proName}</CardTitle>
                                            <CardSubtitle>Price: {(transaction.product.proPrice *0.0031).toFixed(2)} ETH </CardSubtitle>
                                            <CardTitle>Quantity: {transaction.proQuantity}</CardTitle>
                                            <CardTitle>Total Price: {transaction.totalPrice} ETH </CardTitle>
                                            <CardTitle>
                                                <a href={'https://ropsten.etherscan.io/tx/'+transaction.transactionHash}>
                                                    {transaction.transactionHash}
                                                    </a>
                                                </CardTitle>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Card>
                        </CardGroup>
                    </Col>
                )}
            </div>
            </div>
        );

    }
}

export default PurchaseHistory;
