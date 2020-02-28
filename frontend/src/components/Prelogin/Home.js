import React from 'react';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import RedirectToProfile from '../RedirectToProfile';
import {Button, Container, Row, Col} from 'react-bootstrap';

function Home(){
  return(
    <Container>
      <br />
      <RedirectToProfile />
      <Row>
        <Col></Col>
        <Col>
          <Row>
            <Col>
              <Button href='/signin'>Sign In</Button>
            </Col>
            <Col></Col>
            <Col>
              <Button href="/signup">Sign Up</Button>
            </Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default Home;