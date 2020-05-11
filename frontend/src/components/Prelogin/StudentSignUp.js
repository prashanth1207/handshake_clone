import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Form, Button, Alert,
} from 'react-bootstrap';
import { rooturl } from '../../config/config';
import RedirectToJobsPage from '../RedirectToJobsPage';
import { connect } from 'react-redux';
import { LoginIn } from '../../redux/actions/index';
import { StudentSignup } from '../../graphql/mutations/signup';
import { useMutation } from 'react-apollo';


function StudentSignUp(props) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [signup, {loading, error, data}] = useMutation(StudentSignup);
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
        role: 'Student',
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        currentCollegeName: form.currentCollegeName.value,
      }
    })
  }
  let errorTag = null;
  if (error) {
    errorTag = <Alert variant="danger">{error}</Alert>;
  }
  return (
    <Container>
      <RedirectToJobsPage />
      <br />

      <Row>
        <Col />
        <Col>
          <h2>Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            {errorTag}
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control name="firstName" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="lastName" required />
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
              <Form.Label>College</Form.Label>
              <Form.Control name="currentCollegeName" required />
            </Form.Group>
            <Button variant="primary" type="submit">Register</Button>
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
const ConnectedStudentSignUp = connect(null, mapDispatchToProps)(StudentSignUp);
export default ConnectedStudentSignUp;
