import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Card, Modal, Button,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { rooturl } from '../../../../config/config';


function StudentsRegisteredForEvent(props) {
  const { id: eventId } = useParams();
  const [eventRegistrationsResp, seteventRegistrationsResp] = useState({ status: 'loading', eventRegistrations: null });
  if (eventRegistrationsResp.status === 'loading') {
    axios.get(`${rooturl}/event_registrations?event=${eventId}`)
      .then((resp) => {
        seteventRegistrationsResp({ status: 'loaded', eventRegistrations: resp.data.data || [] });
      });
  }
  if (eventRegistrationsResp.status === 'loading') {
    return <div>Loading...</div>;
  }

  let eventRegistrations_tag = eventRegistrationsResp.eventRegistrations.map((eventRegistration) => (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>
              {eventRegistration.studentProfile.firstName}
              {' '}
              {eventRegistration.studentProfile.lastName}
            </Card.Title>
            <Card.Text>
              Registered on
              {new Date(eventRegistration.createdAt).toLocaleString('en-US', { dateStyle: 'full' })}
            </Card.Text>
            <Card.Text>
              <Card.Link href={`/student_profile/${eventRegistration.studentProfile._id}`} id={eventRegistration.studentProfile._id}>View Profile</Card.Link>
            </Card.Text>

          </Card.Body>
        </Card>
      </Col>
    </Row>
  ));
  eventRegistrations_tag = eventRegistrations_tag.length > 0 ? eventRegistrations_tag : <h3 style={{textAlign: 'center'}}>No students have registered!</h3>;
  return (
    <Container>
      <h2>Registered Students</h2>
      {eventRegistrations_tag}
    </Container>
  );
}

export default StudentsRegisteredForEvent;
