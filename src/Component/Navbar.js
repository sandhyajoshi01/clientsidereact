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
import './Navbar.css';
import UserService from "../Service/UserService";
import {User} from "../Models/UserModel";
import login from "./Login";


class NavbarHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: new User('', '','','',''),
      isOpen: false,
      isLoggedIn:false,
      message:''
    };
    this.handleLoginClick=this.handleLoginClick.bind(this);
    this.handleLogoutClick=this.handleLogoutClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  handleLoginClick(){
    this.setState({isLoggedIn:true})
    //this.props.history.push('/login')
  }
  handleLogoutClick(){
    const {user} =this.state.user;
    UserService.logoutUser(user)
        .then(
            data => {
              this.props.history.push('/');
              this.setState({ message: "You are logged out.",isLoggedIn:false});
            }
        );

  }
  render(){
    const isLoggedIn =this.state.isLoggedIn;
    //console.log(isLoggedIn)
    return (
        <>
          <div>
            <Navbar style={{backgroundColor: '#ffcdd2'}} light expand="md">
              <NavbarBrand href="/" className="icons">
                <h5>Sask Shopping cart</h5>
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              {/*<Collapse isOpen={this.state.isOpen} navbar>*/}
                <Nav className="ml-auto" navbar>
                  <UncontrolledDropdown nav inNavbar className="m-auto">
                    <DropdownToggle nav caret className="m-auto">
                    </DropdownToggle>
                    <DropdownMenu right className="ml-auto">
                      {/*{!isLoggedIn ?*/}
                          <div>

                          <DropdownItem onClick={this.handleLoginClick} href="/login">
                            Login
                          </DropdownItem>
                          <DropdownItem href="/signup">
                            Sign-up
                          </DropdownItem>
                          </div>
                        {/*:*/}
                        <DropdownItem onClick={this.handleLogoutClick} href="/">
                        Logout
                        </DropdownItem>
                      {/*}*/}


                      <DropdownItem href="/usercontrol">
                        Set Permission
                      </DropdownItem>
                      <DropdownItem href="/purchasehistory">
                        User Purchase History
                      </DropdownItem>
                        <DropdownItem href="/contracthistory">
                            View Contract History
                        </DropdownItem>
                      <DropdownItem divider />
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              {/*</Collapse>*/}
            </Navbar>
          </div>
        </>
    );

  }
}
export default NavbarHead;