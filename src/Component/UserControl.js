import React, {Component} from "react";
import {Fragment} from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBBtn,
    MDBInput
} from "mdbreact";
import {Modal, ModalBody} from "reactstrap";
import UserService from '../Service/UserService';
import {User} from '../Models/UserModel';
import {Contracts} from "../Models/Contracts";
import Web3 from "web3";
import NavbarHead from "./Navbar";
import './Navbar.css';
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


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
            transactionHash: '',
            modalComp: false,
            modalData: false,
            modalPurpose: false,
            modalReward: false,
            modalCondition: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.setNameContract = this.setNameContract.bind(this);
        this.saveContract = this.saveContract.bind(this);
        this.toggleComp = this.toggleComp.bind(this);
        this.toggleData = this.toggleData.bind(this);
        this.togglePurpose = this.togglePurpose.bind(this);
        this.toggleReward = this.toggleReward.bind(this);
        this.toggleCondition = this.toggleCondition.bind(this);
    }

    toggleComp() {
        this.setState({modalComp: !this.state.modalComp})
    }

    toggleData() {
        this.setState({modalData: !this.state.modalData})
    }

    togglePurpose() {
        this.setState({modalPurpose: !this.state.modalPurpose})
    }

    toggleReward() {
        this.setState({modalReward: !this.state.modalReward})
    }

    toggleCondition() {
        this.setState({modalCondition: !this.state.modalCondition})
    }

    //user and contract models have permissions in common
    handleChange(e) {
        const {name, value} = e.target;
        const user = this.state.currentUser;
        user[name] = value;
        this.setState({currentUser: user});
    }

    componentDidMount() {
        if (!UserService.currentUserValue) {
            this.props.history.push('/login');
            return;
        }
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
        debugger
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
            result.transactionHash, user);
        console.log("smcontract completed spinner", this.state.isSpinnerLoading)
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
        debugger
        this.setState({submitted: true});
        const user = this.state.currentUser;
        if (!(user.allowedCompanies && user.allowedData && user.allowedPurpose && user.allowedReward && user.allowedCondition)) {
            return;
        }
        this.setNameContract();
        e.target.value = null;

    }


    render() {

        const {submitted, errorMessage, successMessage} = this.state;
        const user = this.state.currentUser;
        return (
            <div className="container" backgroundColor="text-muted">
                <div><NavbarHead/></div>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBCard>
                                {/*header pt-3 grey lighten-2*/}
                                {/*<div className="alert alert-info">*/}
                                <div className="header pt-3 grey lighten-2">
                                    <MDBRow className="d-flex justify-content-start">
                                        <h5 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                                            This allows you to decide which of your data can be shared, which
                                            companies can access your data under what condition,
                                            for what declared purposes and in exchange of what.
                                        </h5>
                                    </MDBRow>
                                </div>
                                {errorMessage &&
                                <div className="alert alert-danger" role="alert">
                                    <strong>Error! </strong> {errorMessage}
                                </div>
                                }

                                <MDBCardBody className="mx-4 mt-4">
                                    <div
                                        className={'form-group' + (submitted && user.allowedCompanies ? 'has-error' : '')}>
                                        <FontAwesomeIcon icon={faInfoCircle} size="lg" onClick={this.toggleComp}
                                                         style={{marginLeft: "475px", position: "absolute"}}/>

                                        <MDBInput label="Allowed Companies" group type="text"
                                                  name="allowedCompanies" value={user.allowedCompanies}
                                                  onChange={(e) => this.handleChange(e)}/>

                                        <div>
                                            <Modal isOpen={this.state.modalComp} toggle={this.toggleComp}>
                                                <ModalBody>
                                                    Enter the companies from the list that you allow to share data with
                                                    (use comma to separate) :
                                                    <br/>
                                                    Event & Entertainment Enterprise<br/>
                                                    Technology Enterprise<br/>
                                                    Eco Enterprise<br/>
                                                    Investor Enterprise<br/>
                                                    MetaSecurity Enterprise<br/>
                                                </ModalBody>
                                            </Modal>
                                        </div>
                                        {submitted && !user.allowedCompanies &&
                                        <div className="alert alert-danger" role="alert">Allowed Companies is required
                                        </div>
                                        }
                                    </div>

                                    <div className={'form-group' + (submitted && user.allowedData ? 'has-error' : '')}>
                                        <FontAwesomeIcon icon={faInfoCircle} size="lg" onClick={this.toggleData}
                                                         style={{marginLeft: "475px", position: "absolute"}}/>
                                        <MDBInput label="Allowed Data" group type="text"
                                                  name="allowedData" value={user.allowedData}
                                                  onChange={(e) => this.handleChange(e)}/>
                                        <div>
                                            <Modal isOpen={this.state.modalData} toggle={this.toggleData}>
                                                <ModalBody>
                                                    Enter the type of data from the list that you allow to share (use
                                                    comma to separate) :
                                                    <br/>
                                                    Purchase History<br/>
                                                    Profile Data<br/>
                                                </ModalBody>
                                            </Modal>
                                        </div>
                                        {submitted && !user.allowedData &&
                                        <div className="alert alert-danger" role="alert">Data is required
                                        </div>
                                        }
                                    </div>
                                    <div
                                        className={'form-group' + (submitted && user.allowedPurpose ? 'has-error' : '')}>
                                        <FontAwesomeIcon icon={faInfoCircle} size="lg" onClick={this.togglePurpose}
                                                         style={{marginLeft: "475px", position: "absolute"}}/>

                                        <MDBInput label="Allowed Purpose" group type="text"
                                                  name="allowedPurpose" value={user.allowedPurpose}
                                                  onChange={(e) => this.handleChange(e)}/>
                                        <div>
                                            <Modal isOpen={this.state.modalPurpose} toggle={this.togglePurpose}>
                                                <ModalBody>
                                                    Enter the purpose from the list for sharing data (use comma to
                                                    separate) :
                                                    <br/>
                                                    Personalization<br/>
                                                    User Modeling<br/>
                                                    Research<br/>
                                                    Advertisement<br/>
                                                </ModalBody>
                                            </Modal>
                                        </div>
                                        {submitted && !user.allowedPurpose &&
                                        <div className="alert alert-danger" role="alert">Purposes are required
                                        </div>
                                        }
                                    </div>
                                    <div
                                        className={'form-group' + (submitted && user.allowedReward ? 'has-error' : '')}>
                                        <FontAwesomeIcon icon={faInfoCircle} size="lg" onClick={this.toggleReward}
                                                         style={{marginLeft: "475px", position: "absolute"}}/>
                                        <MDBInput label="Allowed Reward" group type="text"
                                                  name="allowedReward" value={user.allowedReward}
                                                  onChange={(e) => this.handleChange(e)}/>
                                        <div>

                                            <Modal isOpen={this.state.modalReward} toggle={this.toggleReward}>
                                                <ModalBody>
                                                    Enter the payment as reward for allowing to use your data
                                                    <br/>
                                                    Use the following format:
                                                    4 ETH per access<br/>
                                                </ModalBody>
                                            </Modal>
                                        </div>
                                        {submitted && !user.allowedReward &&
                                        <div className="alert alert-danger" role="alert">Reward is required
                                        </div>
                                        }
                                    </div>
                                    <div
                                        className={'form-group' + (submitted && user.allowedCondition ? 'has-error' : '')}>
                                        <FontAwesomeIcon icon={faInfoCircle} size="lg" onClick={this.toggleCondition}
                                                         style={{marginLeft: "475px", position: "absolute"}}/>
                                        <MDBInput label="Allowed Condition" group type="text"
                                                  name="allowedCondition" value={user.allowedCondition}
                                                  onChange={(e) => this.handleChange(e)}/>
                                        <div>
                                            <Modal isOpen={this.state.modalCondition} toggle={this.toggleCondition}>
                                                <ModalBody>
                                                    Enter the conditions you allow to share data under (use comma to
                                                    separate) :
                                                    <br/>
                                                    Deposit Ether directly into account<br/>
                                                    Or create your own
                                                </ModalBody>
                                            </Modal>
                                        </div>
                                        {submitted && !user.allowedCondition &&
                                        <div className="alert alert-danger" role="alert">Conditions are required
                                        </div>
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
                                    {!this.state.transactionHash ?
                                    <div className="preloader-wrapper big active">
                                        <div className="spinner-layer spinner-red-only">
                                            <div className="circle-clipper left">
                                                <div className="circle"></div>
                                            </div>
                                            <div className="gap-patch">
                                                <div className="circle"></div>
                                            </div>
                                            <div className="circle-clipper right">
                                                <div className="circle"></div>
                                            </div>
                                        </div>
                                    </div> : null
                                    }
                                    {this.state.transactionHash ?
                                        <div className={'form-group'}>
                                            <MDBContainer>
                                                {/*<MDBBtn color="#ffcdd2">Transaction Hash in blockchain:</MDBBtn>*/}
                                                Contract Deployed! <br/>Transaction Hash in blockchain <br/>
                                                <a href={'https://ropsten.etherscan.io/tx/' + this.state.transactionHash}>{this.state.transactionHash}
                                                </a>
                                            </MDBContainer>
                                        </div>
                                        : null
                                    }
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    };
};
export default usercontrol;
