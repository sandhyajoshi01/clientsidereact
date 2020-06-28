import React, {Component} from "react";
import {
    Card,CardBody,
    CardTitle, CardSubtitle,CardGroup
} from 'reactstrap';
import UserService from "../Service/UserService";
import {Col, Row} from "react-flexbox-grid";
import NavbarHead from "./Navbar";


class PurchaseHistory extends Component {
    constructor(props) {
        super(props);
        if(!UserService.currentUserValue){
            this.props.history.push('/');
            return;
        }
        this.state = {
            message: "",
            currentUser: UserService.currentUserValue,
            transactions: []
        }
        this.getTransactions= this.getTransactions.bind(this);
    }

    componentDidMount() {
        this.getTransactions()
    }

    getTransactions(){
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
            <>
            <div><NavbarHead/></div>
            <div className="alert alert-info">
                {/*{console.log('this.state.transactions.data',this.state.transactions)}*/}
                {this.state.transactions ?
                    <h5>Click on the purchase-transaction hash to view details</h5>: null}
                {this.state.transactions.map(transaction =>
                    <Col>
                        <CardGroup style={{marginTop: "20px", marginBottom: "20px", marginRight: "10px"}}>
                            <Card style={{width: "20rem"}}>
                                <Row className="ProductContainer">
                                    <Card key={transaction.trid}/>
                                    <Col md="8">
                                        <CardBody>
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
            </>
        );

    }
}

export default PurchaseHistory;
