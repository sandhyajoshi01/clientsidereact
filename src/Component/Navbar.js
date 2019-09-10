import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap';
import  user from '../Icons/user-solid.svg';
import faShoppingCart from '../Icons/shopping-cart-solid.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';
import SearchBar from './SearchProduct';
import {faSignInAlt, faUserPlus, faHome, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import UserService from "../Service/UserService";
import {User} from "../Models/UserModel";

class NavbarHead extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      user: new User('', ''),
      isOpen: false,
      isLoggedIn:false,
      message:''
    };
    this.handleLoginClick=this.handleLoginClick.bind(this);
    this.handleLogoutClick=this.handleLogoutClick.bind(this);

  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
    };
    handleLoginClick(){
      this.setState({isLoggedIn:true})
    }
    handleLogoutClick(){
      this.setState({isLoggedIn:false});
      const {user} =this.state.user;
      UserService.logoutUser(user)
          .then(
              data => {
                this.props.history.push('/');
                this.setState({ message: "You are logged out."});
              }
          );
    }
  render(){
      const isLoggedIn =this.state.isLoggedIn;
      let Link;
    return (
    <>
      <div>
        <Navbar style={{backgroundColor: '#ffcdd2'}} light expand="md">
          <NavbarBrand href="/" className="icons">
            <FontAwesomeIcon icon={faHome}/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="icons">
                <img src={faShoppingCart}></img>
              </NavItem>
              <NavItem className="icons">
                <NavLink href="/cart"> Cart </NavLink>
              </NavItem>
                 <UncontrolledDropdown nav inNavbar className="m-auto">
                   <DropdownToggle nav caret className="m-auto">
                       <img src={user}></img>
                   </DropdownToggle>
                   <DropdownMenu right className="ml-auto">
                     <DropdownItem href="/login">
                       Login
                       <FontAwesomeIcon icon={faSignInAlt} fixedWidth/>
                     </DropdownItem>
                     <DropdownItem  onClick={this.handleLogoutClick} href="/">
                       Log-out
                       <FontAwesomeIcon icon={faSignOutAlt} fixedWidth/>
                     </DropdownItem>
                     <DropdownItem href="/signup">
                       Sign-up
                       <FontAwesomeIcon icon={faUserPlus} fixedWidth/>
                     </DropdownItem>
                     <DropdownItem divider />
                   </DropdownMenu>
                 </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      </>
    );

  }
}
export default NavbarHead;
