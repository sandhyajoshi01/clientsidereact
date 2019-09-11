import React,{Component} from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Badge
} from 'reactstrap';
import {User} from '../Models/UserModel';
import {Transaction} from '../Models/Transaction';
import UserService from "../Service/UserService";
import {withRouter} from 'react-router-dom';


class cart extends Component{
    constructor(props){
        super(props);
        this.state={
            Products:[],
            inputValue: "",
            id:this.props.match.params.id,
            product:JSON.parse(localStorage.getItem('currentProduct')),
            currentUser: new User()
        }
        this._handleUpdate = this._handleUpdate.bind(this);
        this._reset = this._reset.bind(this);
    }
    _handleUpdate(e) {
        if (e.target.value>=0) {
            this.setState({ inputValue: e.target.value });
        }
    }

    _reset() {
        this.setState({ inputValue: "" });
    }


    componentDidMount() {
        UserService.currentUser.subscribe(data => {
            this.setState({
                currentUser: data
            })
        });
    }
    checkout() {
        if(!this.state.currentUser){
            this.setState({errorMessage: "You should login in to checkout"});
            return;
        }
        this.props.history.push('/checkout');

    }
    render() {
        const { Products, totalPrice } =  this.state;
        return(
            <div>
                    <Card style={{marginTop:"20px",marginBottom:"20px",marginRight:"10px"}} >
                    <CardImg top width="50%" src={this.state.product.proImageURL}
                             alt={this.state.product.proName} style={{maxHeight:"200px", maxWidth:"200px"}}/>
                    <CardBody style={{width:"20rem"}}>
                    <CardTitle>Name: {this.state.product.proName}</CardTitle>
                    <CardTitle>Brand: {this.state.product.proBrand}</CardTitle>
                    <CardSubtitle>${this.state.product.proPrice} CAD</CardSubtitle>
                        <div>
                            <input type="number" value={this.state.inputValue} onChange={this._handleUpdate} step="any"
                                   placeholder="Quantity"/>
                            <button onClick={this._reset}>reset</button>
                        </div>

                    </CardBody>
                    </Card>
                <div className="commonContainer">
                    <h4><Badge color="light">Total: ${this.state.inputValue*this.state.product.proPrice}</Badge></h4>

                    <h4><Button color="secondary"  onClick={() => this.checkout()}>Checkout</Button></h4>
                </div>
            </div>

        );
    }

}
export default withRouter(cart);
