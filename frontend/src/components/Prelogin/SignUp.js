import React from 'react';
import {Link} from 'react-router-dom';
import RedirectToProfile from '../RedirectToProfile';
import {Button, Container, Row, Col} from 'react-bootstrap';


function SignUp(){
  return(
    <div>
      <RedirectToProfile />
      <br />
      <Row>
        <Col></Col>
        <Col>
          <Row>
            <Col>
              <Button href='/company_signup'>Company</Button>
            </Col>
            <Col></Col>
            <Col>
              <Button href="/student_signup">Student</Button>
            </Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default SignUp;