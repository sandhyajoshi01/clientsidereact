import React, {Component} from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBBadge,
    MDBBtn,
    MDBInput
} from "mdbreact";
import UserService from '../Service/UserService';
import {User} from '../Models/UserModel';
import {Contracts} from "../Models/Contracts";
import Web3 from "web3";
import NavbarHead from "./Navbar";

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
console.log("web3", web3)
const Cart1 = new web3.eth.Contract([
    {
        "constant": false,
        "inputs": [
            {
                "name": "company",
                "type": "string"
            },
            {
                "name": "data",
                "type": "string"
            },
            {
                "name": "purpose",
                "type": "string"
            },
            {
                "name": "reward",
                "type": "string"
            },
            {
                "name": "condition",
                "type": "string"
            }
        ],
        "name": "setName",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "dataowner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "company",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "data",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "purpose",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "reward",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "condition",
                "type": "string"
            }
        ],
        "name": "Changed",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "dataowner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
], '0x1ba3a0e82ceb83ae25be5371c065762eb457563a');
console.log("cart1", Cart1);

class usercontrol extends Component {
    constructor(props) {
        "use strict";
        super(props);
        this.state = {
            currentUser: new User('', '', '', '', '', '', '', '', '', '', '', ''),
            submitted: false,
            errorMessage: '',
            cartContract: '',
            successMessage: '',
            accounts: '',
            transactionHash: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.setNameContract = this.setNameContract.bind(this);
        this.saveContract=this.saveContract.bind(this);

    }
    //user and contract models have permissions in common
    handleChange(e) {
        const {name, value} = e.target;
        const user = this.state.currentUser;
        user[name] = value;
        this.setState({currentUser: user});
    }

    componentDidMount() {
        this.setState({web3InUse: web3})
        this.setState({cartContract: Cart1})
        UserService.currentUser.subscribe(data => {
            console.log(data)
            this.setState({
                currentUser: data
            })
        });

        window.addEventListener('load', async () => {
            const network = await web3.eth.net.getNetworkType();
            console.log(network)
            const accounts = await web3.eth.getAccounts()
            console.log("Account", accounts)
            this.setState({accounts: accounts[0]})
        })
    }

    async setNameContract() {
        const user = this.state.currentUser
        let result = await this.state.cartContract.methods.setName(user.allowedCompanies, user.allowedData
            , user.allowedPurpose, user.allowedReward, user.allowedCondition)
            .send({from: this.state.accounts})
        this.setState({transactionHash: result.transactionHash})
        console.log(result);
        let changeEmit = await this.state.cartContract.events.Changed()
        console.log(changeEmit)
        const contract = new Contracts(user.allowedCompanies, user.allowedData
            , user.allowedPurpose, user.allowedReward, user.allowedCondition,
            result.transactionHash,user);
        this.saveContract(contract);

    };

    saveContract(contract) {
        debugger
        UserService.saveContract(contract)
            .then(
                data => {
                    this.setState({successMessage: "Permissions set successfully!!"})
                },
                error => {
                    if (error.response.status === 409) {
                        this.setState({
                            errorMessage: "Permissions not saved"
                        });
                    } else {
                        this.setState({
                            errorMessage: "Unexpected error occurred"
                        });
                    }
                }
            );

    }

    handlePermissions(e) {
        e.preventDefault();
        this.setState({submitted: true});
        const user = this.state.currentUser;
        if (!(user.allowedCompanies && user.allowedData && user.allowedPurpose && user.allowedReward && user.allowedCondition)) {
            return;
        }
        this.setNameContract();

    }

    render() {

        const {submitted, errorMessage, successMessage} = this.state;
        const user = this.state.currentUser;
        return (
            <>
            <div><NavbarHead/></div>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <MDBCard>
                            <div className="header pt-3 grey lighten-2">
                                <MDBRow className="d-flex justify-content-start">
                                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                                        This allows users to decide which of the users' data can be shared, which
                                        companies can access user data under what condition,
                                        for what declared purposes and in exchange of what.
                                    </h3>
                                </MDBRow>
                            </div>
                            {errorMessage &&
                            <div className="alert alert-danger" role="alert">
                                <strong>Error! </strong> {errorMessage}
                            </div>
                            }

                            <MDBCardBody className="mx-4 mt-4">
                                <div className={'form-group' + (submitted && user.allowedCompanies ? 'has-error' : '')}>

                                    <MDBInput label="Allowed Companies" group type="text"
                                              name="allowedCompanies" value={user.allowedCompanies}
                                              onChange={(e) => this.handleChange(e)}/>
                                    {submitted && !user.allowedCompanies &&
                                    <div className="alert alert-danger" role="alert">Allowed Companies is required
                                    </div>
                                    }
                                </div>

                                <div className={'form-group' + (submitted && user.allowedData ? 'has-error' : '')}>

                                    <MDBInput label="Allowed Data" group type="text"
                                              name="allowedData" value={user.allowedData}
                                              onChange={(e) => this.handleChange(e)}/>
                                    {submitted && !user.allowedData &&
                                    <div className="alert alert-danger" role="alert">Data is required
                                    </div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && user.allowedPurpose ? 'has-error' : '')}>

                                    <MDBInput label="Allowed Purpose" group type="text"
                                              name="allowedPurpose" value={user.allowedPurpose}
                                              onChange={(e) => this.handleChange(e)}/>
                                    {submitted && !user.allowedPurpose &&
                                    <div className="alert alert-danger" role="alert">Purposes are required
                                    </div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && user.allowedReward ? 'has-error' : '')}>

                                    <MDBInput label="Allowed Reward" group type="text"
                                              name="allowedReward" value={user.allowedReward}
                                              onChange={(e) => this.handleChange(e)}/>
                                    {submitted && !user.allowedReward &&
                                    <div className="alert alert-danger" role="alert">Reward is required
                                    </div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && user.allowedCondition ? 'has-error' : '')}>

                                    <MDBInput label="Allowed Condition" group type="text"
                                              name="allowedCondition" value={user.allowedCondition}
                                              onChange={(e) => this.handleChange(e)}/>
                                    {submitted && !user.allowedCondition &&
                                    <div className="alert alert-danger" role="alert">Conditions are required
                                    </div>
                                    }
                                </div>
                                <div className={'form-group'}>
                                    {this.state.transactionHash ?
                                        <MDBContainer>
                                            {/*<MDBBtn color="#ffcdd2">Transaction Hash in blockchain:</MDBBtn>*/}
                                            Transaction Hash in blockchain <br/>
                                            <a href={'https://ropsten.etherscan.io/tx/' + this.state.transactionHash}>{this.state.transactionHash}
                                            </a>
                                        </MDBContainer>

                                        : null
                                    }
                                </div>
                                <div className="text-center mb-4 mt-5">
                                    <MDBBtn
                                        color="danger"
                                        type="button"
                                        className="btn-block z-depth-2"
                                        onClick={(e) => this.handlePermissions(e)}
                                    >
                                        Set Permissions
                                    </MDBBtn>
                                </div>

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
                </>
        );
    };
};
export default usercontrol;
