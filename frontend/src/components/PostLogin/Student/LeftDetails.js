import React from 'react';
import IdentityCard from './IdentityCard'
import SkillSet from './SkillSet'
import {Container, Row, Col, Card} from 'react-bootstrap'


export default function LeftDetails(props){
  return(
  <Container>
    <Row className='my-3'>
      <Col>
        <IdentityCard studentProfile={props.studentProfile}/>
      </Col>
    </Row>
    <Row className='my-3'>
      <Col>
        <SkillSet studentProfile={props.studentProfile}/>
      </Col>
    </Row>
  </Container>
  )
}