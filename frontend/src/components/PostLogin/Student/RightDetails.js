import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CareerObjective from './CareerObjective';
import EducationDetails from './EducationDetails';
import WorkExperience from './WorkExperience';

export default function RightDetails(props) {
  return (
    <Container>
      <Row className="my-3">
        <Col>
          <CareerObjective studentProfile={props.studentProfile} />
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <EducationDetails studentProfile={props.studentProfile} />
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <WorkExperience studentProfile={props.studentProfile} />
        </Col>
      </Row>
    </Container>
  );
}
