import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Container, Row, Col, Form, Button, Alert,
} from 'react-bootstrap';
import { LoginIn } from '../../redux/actions/index';
import RedirectToProfile from '../RedirectToJobsPage';

function SignIn(props) {
  const [errorMsg, setErrorMsg] = useState(null);

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
    axios.post('http://localhost:3001/users/login', formData)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          if (response.data.success === true) {
            sessionStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));
            props.loggedIn();
          } else {
            setErrorMsg(response.data.error);
          }
        }
      });
  }
  let errTag = null;
  if (errorMsg) {
    errTag = <Alert variant="danger">{errorMsg}</Alert>;
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

const mapDispatchToProps = {
  loggedIn: LoginIn,
};
const ConnectedSignIn = connect(null, mapDispatchToProps)(SignIn);
export default ConnectedSignIn;
