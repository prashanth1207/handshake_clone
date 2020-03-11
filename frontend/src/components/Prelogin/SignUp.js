import React from 'react';
import {
  Button, Row, Col,
} from 'react-bootstrap';
import RedirectToJobsPage from '../RedirectToJobsPage';


function SignUp() {
  return (
    <div>
      <RedirectToJobsPage />
      <br />
      <Row>
        <Col />
        <Col>
          <Row>
            <Col>
              <Button href="/company_signup">Company</Button>
            </Col>
            <Col />
            <Col>
              <Button href="/student_signup">Student</Button>
            </Col>
          </Row>
        </Col>
        <Col />
      </Row>
    </div>
  );
}

export default SignUp;
