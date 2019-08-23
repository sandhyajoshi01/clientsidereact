import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';


class signup extends Component {
constructor(props) {
    super(props);
      this.state = {
      'email': '',
      'password': '',
      validate: {
        emailState: '',
      },
    }
    this.handleChange = this.handleChange.bind(this);
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state
      if (emailRex.test(e.target.value)) {
        validate.emailState = 'has-success'
      } else {
        validate.emailState = 'has-danger'
      }
      this.setState({ validate })
    }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [ name ]: value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    console.log(`Email: ${ this.state.email }`)
    }
  render() {
    return (
      <Container className="Signup">
        <h2>Sign up</h2>
        <Form className="SignupForm">
          <Col>
            <FormGroup>

              <Input
                type="firstname"
                name="firstname"
                id="txtFirstName"
                placeholder="First Name"
              />
            </FormGroup>
          </Col>
           <Col>
           <FormGroup>

             <Input
               type="lastname"
                name="lastname"
                id="txtLastName"
                placeholder="Last Name"
                 />
              </FormGroup>
             </Col>
             <Col>
                        <FormGroup>

                          <Input
                            type="username"
                             name="username"
                             id="txtUsername"
                             placeholder="Username"
                              />
                           </FormGroup>
                          </Col>
                          <Col>
                           <FormGroup>

                                        <Input
                                          type="email"
                                          name="email"
                                          id="txtEmail"
                                          placeholder="you@example.com"
                                        />
                                      </FormGroup>
                                      </Col>
          <Col>
            <FormGroup>
              <Input
                type="password"
                name="password"
                id="txtPassword"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Button>Sign Up</Button>
        </Form>

      </Container>
    );
  }
}

export default signup;