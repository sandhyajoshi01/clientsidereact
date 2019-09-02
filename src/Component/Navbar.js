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
import cart from '../Icons/shopping-cart-solid.svg';
import home from '../Icons/home-solid.svg';
import './Navbar.css';
import login from './Login';
import signup from './Signup2';
import SearchBar from './SearchProduct';


class NavbarHead extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isLoggedIn:false
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
      this.setState({isLoggedIn:false})
    }
  render(){
      const isLoggedIn =this.state.isLoggedIn;
      let Link;
    return (
    <>
      <div>
        <Navbar style={{backgroundColor: '#ffcdd2'}} light expand="md">
          <NavbarBrand href="/" className="icons">< img src={home}/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="ml-lg-0">
                <img src={cart}/>
              </NavItem>
              <NavItem>
                <NavLink href="/shoppingcart" >Cart </NavLink>
              </NavItem>
                 <UncontrolledDropdown nav inNavbar>
                   <DropdownToggle nav caret className="m-auto">
                       <img src={user}></img>
                   </DropdownToggle>
                   <DropdownMenu right>
                     <DropdownItem href="/login">
                       Log-in
                     </DropdownItem>
                     <DropdownItem>
                       Log-out
                     </DropdownItem>
                     <DropdownItem href="/signup">
                       Sign-up
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
