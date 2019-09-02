import React,{Component} from "react";
import {Nav, Navbar, NavItem, NavLink} from "reactstrap";


class LoginControl extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoggedIn:false
        };
        this.handleLoginClick=this.handleLoginClick.bind(this);
        this.handleLogoutClick=this.handleLogoutClick.bind(this);

    }
    handleLoginClick(){
        this.setState({isLoggedIn:true})
    }
    handleLogoutClick(){
        this.setState({isLoggedIn:false})
    }
    render(){
        const isLoggedIn =this.state.isLoggedIn;
        if(isLoggedIn){
                return <NavItem onClick={this.handleLoginClick}></NavItem>
        }
        else
        {
            return <NavItem  onClick={this.handleLogoutClick}>Log-in</NavItem>
        }
    }

}
export default LoginControl;