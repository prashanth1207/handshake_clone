import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../../redux/entry/entryActions';
import axios from 'axios';
import {
  Container, Row, Col, Form, Button, Alert,
} from 'react-bootstrap';
import { rooturl } from '../../config/config';
import RedirectToProfile from '../RedirectToJobsPage';

function SignIn(props) {

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    // set the with credentials to true
    axios.defaults.withCredentials = true;
    // make a post request with the user data
    const formData = {
      emailId: form.emailId.value,
      password: form.password.value,
    };
    props.loggedIn(formData);
  }
  let errTag = null;
  if (props.user.error) {
    errTag = <Alert variant="danger">{props.user.error}</Alert>;
  }
  return (
    <div className="user-signin div-center-align">
      <RedirectToProfile />
      <br />
      <Container>
        <Row>
          <Col />
          <Col>
            <h2>Sign In</h2>
            <Form onSubmit={handleSubmit}>
              {errTag}
              <Form.Group>
                <Form.Label>Email Id</Form.Label>
                <Form.Control name="emailId" type="email" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" required />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
          <Col />
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = {
  loggedIn: userLogin,
};
const ConnectedSignIn = connect(mapStateToProps, mapDispatchToProps)(SignIn);
export default ConnectedSignIn;
