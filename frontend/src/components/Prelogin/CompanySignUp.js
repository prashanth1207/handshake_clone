import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Form, Button, Alert,
} from 'react-bootstrap';
import RedirectToJobsPage from '../RedirectToJobsPage';
import { rooturl } from '../../config/config';
import { connect } from 'react-redux';
import { LoginIn } from '../../redux/actions/index';

function CompanySignUp(props) {
  const [errorMsg, setErrorMsg] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const form_data = {
      userData: {
        emailId: form.emailId.value,
        password: form.password.value,
        role: 'Company',
      },
      profileData: {
        name: form.name.value,
        location: form.location.value,
      },
    };
    axios.defaults.withCredentials = true;
    axios.post(`${rooturl}/users/register`, form_data)
      .then((response) => {
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
  let errorTag = null;
  if (errorMsg) {
    errorTag = <Alert variant="danger">{errorMsg}</Alert>;
  }

  return (
    <Container>
      <RedirectToJobsPage />
      <Row>
        <Col />
        <Col>
          <br />
          <h2>Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            {errorTag}
            <Form.Group>
              <Form.Label>Company Name</Form.Label>
              <Form.Control name="name" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email Id</Form.Label>
              <Form.Control name="emailId" required type="email" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" required type="password" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control name="location" required />
            </Form.Group>
            <Button type="submit" variant="primary">Register</Button>
          </Form>
        </Col>
        <Col />
      </Row>
      <br />
    </Container>
  );
}

const mapDispatchToProps = {
  loggedIn: LoginIn,
};
const ConnectedCompanySignUp = connect(null, mapDispatchToProps)(CompanySignUp);
export default ConnectedCompanySignUp;
