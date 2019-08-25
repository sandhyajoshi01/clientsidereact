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
} from 'reactstrap';
import login from './Login';
import signup from './Signup';
import SearchBar from './SearchProduct';




class NavbarHead extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
    <>
      <div>
        <Navbar style={{backgroundColor: '#ffcdd2'}} light expand="md">
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/shoppingcart">Shopping Cart</NavLink>
              </NavItem>
               <NavItem>
               <NavLink href="./login">login</NavLink>
               </NavItem>
              <NavItem>
              <NavLink href="/signup">Sign up</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      </>
    );

  }
}
export default NavbarHead;
