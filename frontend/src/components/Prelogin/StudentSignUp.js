import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Form, Button, Alert,
} from 'react-bootstrap';
import RedirectToJobsPage from '../RedirectToJobsPage';

function StudentSignUp() {
  const [errorMsg, setErrorMsg] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const form_data = {
      userData: {
        emailId: form.emailId.value,
        password: form.password.value,
        role: 'Student',
      },
      profileData: {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        currentCollegeName: form.currentCollegeName.value,
      },
    };
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/users/register', form_data)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.success === true) {
            sessionStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));
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
            <br />
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="lastName" required />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Email Id</Form.Label>
              <Form.Control name="emailId" required type="email" />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" required type="password" />
            </Form.Group>
            <Form.Group>
              <Form.Label>College</Form.Label>
              <Form.Control name="currentCollegeName" required />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">Register</Button>
          </Form>
        </Col>
        <Col />
      </Row>
      <br />
    </Container>
  );
}

export default StudentSignUp;
