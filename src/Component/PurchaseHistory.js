import React, {Component} from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Badge, CardGroup
} from 'reactstrap';
import {User} from '../Models/UserModel';
import UserService from "../Service/UserService";
import {Col, Row} from "react-flexbox-grid";
import {Transaction} from "../Models/Transaction";
import {debounce} from "rxjs/operators";


class PurchaseHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            currentUser: new User(),
            transactions: []
        }
        this.getTransactions= this.getTransactions.bind(this);
    }

    componentDidMount() {

        UserService.currentUser.subscribe(loggedindata => {
            this.setState({
                currentUser: loggedindata
            })
        });

    }
    getTransactions(loggedinuser){
        debugger
        UserService.getAllTransactionHash(loggedinuser)
            .then(
                data => {
                    debugger
                    console.log(" tr data",data)
                    this.setState({transactions: data, message: "transactions displayed!"})
                    this.props.history.push('/');
                },
                error => {
                    this.setState({message: "error occurred!"})
                }
            );

    }


    render() {
        return (
            <div className="alert alert-info">
                {console.log("in render",this.state.currentUser)}
                {this.getTransactions(this.state.currentUser)}
                {console.log('in render tr',this.state.transactions)}

                {this.state.transactions.map(transaction =>
                    <Col>
                        <CardGroup style={{marginTop: "20px", marginBottom: "20px", marginRight: "10px"}}>
                            <Card style={{width: "30rem"}}>
                                <Row className="ProductContainer">
                                    <Card key={transaction.trID}/>
                                    <Col md="8">
                                        <CardBody>
                                            <CardTitle>{transaction.transaction_hash}</CardTitle>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Card>
                        </CardGroup>
                    </Col>
                )}
            </div>
        );

    }
}

export default PurchaseHistory;
