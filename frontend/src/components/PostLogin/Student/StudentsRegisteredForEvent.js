import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Card, Modal, Button,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function StudentsRegisteredForEvent(props) {
  const { id: eventId } = useParams();
  const [eventRegistrationsResp, seteventRegistrationsResp] = useState({ status: 'loading', eventRegistrations: null });
  if (eventRegistrationsResp.status === 'loading') {
    axios.get(`http://localhost:3001/event_registrations?eventId=${eventId}`)
      .then((resp) => {
        seteventRegistrationsResp({ status: 'loaded', eventRegistrations: resp.data.data || [] });
      });
  }
  if (eventRegistrationsResp.status === 'loading') {
    return <div>Loading...</div>;
  }

  const eventRegistrations_tag = eventRegistrationsResp.eventRegistrations.map((eventRegistration) => (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>
              {eventRegistration.StudentProfile.firstName}
              {' '}
              {eventRegistration.StudentProfile.lastName}
            </Card.Title>
            <Card.Text>
              Registered on
              {new Date(eventRegistration.createdAt).toLocaleString('en-US', { dateStyle: 'full' })}
            </Card.Text>
            <Card.Text>
              <Card.Link href={`/student_profile/${eventRegistration.StudentProfileId}`} id={eventRegistration.StudentProfileId}>View Profile</Card.Link>
            </Card.Text>

          </Card.Body>
        </Card>
      </Col>
    </Row>
  ));
  return (
    <Container>
      <h2>Registered Students</h2>
      {eventRegistrations_tag}
    </Container>
  );
}

export default StudentsRegisteredForEvent;
