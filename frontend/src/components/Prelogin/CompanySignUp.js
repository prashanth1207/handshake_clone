import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Form, Button, Alert,
} from 'react-bootstrap';
import RedirectToJobsPage from '../RedirectToJobsPage';
import { rooturl } from '../../config/config';
import { connect } from 'react-redux';
import { LoginIn } from '../../redux/actions/index';
import { CompanySignup } from '../../graphql/mutations/signup';
import { useMutation } from 'react-apollo';

function CompanySignUp(props) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [signup, {loading, error, data}] = useMutation(CompanySignup);
  if(data && data.register){
    sessionStorage.setItem('userInfo', JSON.stringify(data.register));
    props.loggedIn();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    signup({
      variables: {
        emailId: form.emailId.value,
        password: form.password.value,
        role: 'Company',
        name: form.name.value,
        location: form.location.value,
      }
    })
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
