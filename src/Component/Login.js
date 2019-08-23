import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,FormText, FormFeedback
} from 'reactstrap';


class login extends Component {

  render() {
    return (
      <Container className="Login">
        <h2>Log In</h2>
        <Form className="Loginform">
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
                type="password"
                name="password"
                id="txtPassword"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Button>Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default login;