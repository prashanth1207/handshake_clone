import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Row, Col, Card, Container,
} from 'react-bootstrap';
import axios from 'axios';
import { rooturl } from '../../../config/config';
import LocationSvg from '../../LocationSvg';


function ShowEventDetails() {
  const { id: eventId } = useParams();
  const [eventResp, setData] = useState({ status: 'loading', event: null });
  if (eventResp.status === 'loading') {
    axios.get(`${rooturl}/events/show/${eventId}`, {
      validateStatus: false,
    }).then((resp) => {
      if (resp.status === 200) {
        setData({ status: 'recordFound', event: resp.data });
      } else {
        setData({ status: 'recordNotFound' });
      }
    });
  }
  if (eventResp.status === 'loading') {
    return <h3>Loading Profile...</h3>;
  } if (eventResp.status === 'recordNotFound') {
    return <h3>Profile Not Found</h3>;
  }

  const { event } = eventResp;
  return (
    <Container>
      <Row className="m-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{event.eventName}</Card.Title>
              <Card.Text>{event.readableTime}</Card.Text>
              <Card.Text>
                <LocationSvg />
&nbsp;
                {event.location}
              </Card.Text>
              <Card.Text>
                Eligible for :
                {event.eligibility}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="m-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Event Description</Card.Title>
              <Card.Text>{event.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ShowEventDetails;
