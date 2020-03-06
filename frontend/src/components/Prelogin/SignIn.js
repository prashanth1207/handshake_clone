import React,{ useState} from 'react';
import {connect} from 'react-redux';
import {LoginIn} from '../../redux/actions/index'
import axios from 'axios';
import RedirectToProfile from '../RedirectToProfile';
import {Container, Row, Col, Form, Button, Alert} from 'react-bootstrap'

function SignIn(props){
  let [loginSuccess,setLoginSuccess] = useState(false);
  let [errorMsg,setErrorMsg] = useState(null);
  
  function handleSubmit(e){
    e.preventDefault();
    let form  = e.currentTarget;
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    let formData = {
      emailId: form.emailId.value,
      password: form.password.value
    }
    axios.post('http://localhost:3001/users/login',formData)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                if (response.data.success === true){
                    sessionStorage.setItem('userInfo',JSON.stringify(response.data.userInfo));
                    props.loggedIn();
                } else{
                  setErrorMsg(response.data.error);
                }
            }
        });
  }
let errTag = null;
  if(errorMsg){
    errTag = <Alert variant='danger'>{errorMsg}</Alert>;
  }
  return(
    <div class='user-signin div-center-align'>
      <RedirectToProfile />
      <br />
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <h2>Sign In</h2>
            <Form onSubmit={handleSubmit}>
              {errTag}
              <Form.Group>
                <Form.Label>Email Id</Form.Label>
                <Form.Control name='emailId' type='email' required/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type='password' required/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  )
}

const mapDispatchToProps = {
  loggedIn: LoginIn
}
let ConnectedSignIn = connect(null,mapDispatchToProps)(SignIn)
export default ConnectedSignIn; 