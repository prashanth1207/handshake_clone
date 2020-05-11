import React, { useState } from 'react';
import { connect } from 'react-redux';
import { LoginIn } from '../../redux/actions/index';
import axios from 'axios';
import {
  Container, Row, Col, Form, Button, Alert,
} from 'react-bootstrap';
import { rooturl } from '../../config/config';
import RedirectToProfile from '../RedirectToJobsPage';
import { graphql, useLazyQuery } from 'react-apollo';
import { SiginInStudent, SiginInCompany } from '../../graphql/queries/login';

function SignIn(props) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [siginInCompany, {company_loading, company_error, data: company_data}] = useLazyQuery(SiginInCompany);
  const [siginInStudent, {student_loading, student_error, data: student_data}] = useLazyQuery(SiginInStudent);
  console.log(company_data);
  console.log(student_data);
  let data = company_data || student_data;
  if(data && data.signin){
    sessionStorage.setItem('userInfo', JSON.stringify(data.signin));
    props.loggedIn();
  }
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    // set the with credentials to true
    axios.defaults.withCredentials = true;
    // make a post request with the user data
    console.log(form.role.value);
    let signInQuery = form.role.value === 'Company' ? siginInCompany : siginInStudent;
    signInQuery({ 
      variables: { 
        emailId: form.emailId.value, 
        password: form.password.value,
      } 
    })
  }
  let errTag = null;
  if (company_error || student_error) {
    errTag = <Alert variant="danger">{company_error || student_error}</Alert>;
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
              <div>
                <Form.Group>
                  <Form.Check
                    inline
                    type='radio'
                    name='role'
                    id={`default-student`}
                    label={`Student`}
                    value='Student'
                    required
                    />
                  <Form.Check
                    inline
                    type='radio'
                    name='role'
                    id={`default-company`}
                    label='Company'
                    value='Company'
                    required
                    />
                </Form.Group>
              </div>
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
