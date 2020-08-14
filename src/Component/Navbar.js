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
import Cart from "./Cart";



class NavbarHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: new User('', '','','',''),
      //isOpen: false,
      isLoggedIn:false,
      message:''
    };
    //this.handleLoginClick=this.handleLoginClick.bind(this);
    this.handleLogoutClick=this.handleLogoutClick.bind(this);
    //this.toggle = this.toggle.bind(this);
  }
  /*toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };*/

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
    componentDidMount() {
        if(UserService.currentUserValue){
            this.setState({isLoggedIn:true,user:UserService.currentUserValue})
        }
    }
    cart(){
    return this.props.cart
    }

  render(){
    const isLoggedIn =this.state.isLoggedIn;
    return (
        <>
          <div style={{position:'fixed',zIndex:100,width:"87%"}}>
            <Navbar style={{backgroundColor: '#ffcdd2'}} light expand="lg">
              <NavbarBrand href="/" className="icons">
                <h5>Sask Shopping cart</h5>
              </NavbarBrand>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink onClick={this.cart}>Cart</NavLink>
                  </NavItem>
                  <NavItem style={{marginTop:"8px",marginLeft:"5px"}}>{isLoggedIn? this.state.user.firstname.toUpperCase(): null}
                  </NavItem>

                  <UncontrolledDropdown nav inNavbar className="m-auto">
                    <DropdownToggle nav caret className="m-auto">
                    </DropdownToggle>
                    <DropdownMenu>
                        {!isLoggedIn ?
                            <div>
                                <DropdownItem href="/login" style={{marginRight:"10px"}}>
                                    Login
                                </DropdownItem>
                                <DropdownItem href="/signup">
                                    Sign-up
                                </DropdownItem>
                            </div>
                            :
                            <div>
                            <DropdownItem href="/usercontrol">
                            Set Permissions
                            </DropdownItem>
                            <DropdownItem href="/purchasehistory">
                            User Purchase History
                            </DropdownItem>
                            <DropdownItem href="/contracthistory">
                            View Contract History
                            </DropdownItem>
                            <DropdownItem onClick={this.handleLogoutClick} href="/">
                                    Logout
                             </DropdownItem>
                            </div>
                        }
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