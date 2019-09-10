import React,{Component} from "react";
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import {User} from '../Models/UserModel';
import UserService from "../Service/UserService";

class cart extends Component{
    constructor(props){
        super(props);
        this.state={
            cart:[],
            id:this.props.match.params.id,
            product:JSON.parse(localStorage.getItem('currentProduct')),
            currentUser: new User(),
        }
    }
    componentDidMount() {
        UserService.currentUser.subscribe(data => {
            this.setState({
                currentUser: data
            })
        });
    }
    render() {
        return(
            <div>
                <Card>
                    <CardImg top width="50%"/>
                    <CardBody>
                        <CardTitle>Id: {this.state.id}</CardTitle>



                    </CardBody>
                </Card>
            </div>

        );
    }

}
export default cart;
