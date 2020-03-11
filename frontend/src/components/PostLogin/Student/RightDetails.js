import React from 'react';
import CareerObjective from './CareerObjective'
import EducationDetails from './EducationDetails' 
import WorkExperience from './WorkExperience' 
import EditProfileSvg from './../../EditProfileSvg'
import {Container, Row, Col} from 'react-bootstrap'

export default function RightDetails(props){
  return(
    <Container>
      <Row className='my-3'>
        <Col>
          <CareerObjective studentProfile={props.studentProfile}/>
        </Col>
      </Row>
      <Row className='my-3'>
        <Col>
          <EducationDetails studentProfile={props.studentProfile}/>
        </Col>
      </Row>
      <Row className='my-3'>
        <Col>
          <WorkExperience studentProfile={props.studentProfile}/>
        </Col>
      </Row>
    </Container>
  )
}