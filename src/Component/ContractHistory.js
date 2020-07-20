import React, {Component} from "react";
import {
    Card,CardBody,
    CardTitle, CardSubtitle,CardGroup
} from 'reactstrap';
import UserService from "../Service/UserService";
import {Col, Row} from "react-flexbox-grid";
import NavbarHead from "./Navbar";
import './Navbar.css';


class ContractHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            currentUser: UserService.currentUserValue,
            contractHash: []
        }
        this.getContractHash= this.getContractHash.bind(this);
    }

    componentDidMount() {
        if(!UserService.currentUserValue){
            this.props.history.push('/login');
            return;
        }
        this.getContractHash()
    }

    getContractHash(){
        const userid = this.state.currentUser.user_id
        UserService.getAllContractHash(userid)
            .then(
                response => {
                    console.log(" tr response.data",response.data)
                    this.setState({contractHash: response.data, message: "transactions displayed!"})
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
                <div className="alert alert-info" >
                    {/*{console.log('this.state.transactions.data',this.state.transactions)}*/}
                    {this.state.contractHash ?
                        <h6>Details of your contract</h6>: null}
                    {this.state.contractHash.map(contract =>
                        <Col>
                            <CardGroup style={{marginTop: "20px", marginBottom: "20px", marginRight: "10px"}}>
                                <Card style={{width: "20rem"}}>
                                    <Row className="ProductContainer">
                                        <Card key={contract.contract_id}/>
                                        <Col md="8">
                                            <CardBody>
                                                <CardTitle>Permitted Companies: {contract.allowedCompanies}</CardTitle>
                                                <CardTitle>Permitted Data: {contract.allowedData}</CardTitle>
                                                <CardTitle>Purpose: {contract.allowedPurpose}</CardTitle>
                                                <CardTitle>Reward: {contract.allowedReward}</CardTitle>
                                                <CardTitle>Conditions set: {contract.allowedCondition}</CardTitle>
                                                <CardTitle>Click on the hash to view details on the blockchain <br/>
                                                    <a href={'https://ropsten.etherscan.io/tx/'+contract.contractHash}>
                                                        {contract.contractHash}
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

export default ContractHistory;
