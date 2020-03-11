import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import { storedUserInfo } from '../../../utility';
import EventRegister from './EventRegister';

function ShowEvents(props) {
  const [eventResp, setEventResp] = useState({ status: 'loading', events: null });
  if (eventResp.status === 'loading') {
    axios.get(`http://localhost:3001/events/${props.for.toLowerCase()}/${storedUserInfo().profile.id}`, { validationStatus: false }).then((resp) => resp.data).then((resp) => {
      if (resp.error) {
        return setEventResp({ status: 'error', events: [] });
      }
      console.dir(resp);
      setEventResp({ status: 'loaded', events: resp.events, major: resp.studentMajor });
    });
  }
  const handleOnChange = (e) => {
    const { form } = e.currentTarget;
    const queryData = {
      eventName: form.eventName.value,
    };
    console.dir(queryData);
    axios.get(`http://localhost:3001/events/${props.for.toLowerCase()}/${storedUserInfo().profile.id}`, { params: queryData }, { validateStatus: false }).then((resp) => resp.data).then((resp) => {
      if (resp.error) {
        return setEventResp({ status: 'error', events: [] });
      }
      console.dir(resp.data);
      setEventResp({ status: 'loaded', events: resp.events, major: resp.studentMajor });
    });
  };

  const resetForm = (e) => {
    e.currentTarget.form.reset();
    handleOnChange(e);
  };

  if (eventResp.status === 'loading') {
    return <h3>Loading Events...</h3>;
  }
  if (eventResp.status === 'error') {
    return <h3>Something went wrong!</h3>;
  }
  const eventsSection = eventResp.events.map((event) => {
    let externalTag = null;
    if (props.for === 'Student') {
      externalTag = <EventRegister event={event} studentProfileId={storedUserInfo().profile.id} studentMajor={eventResp.major} />;
    } else {
      externalTag = <Card.Link href={`/company/events/${event.id}/students`}>Registrations</Card.Link>;
    }
    return (
      <Row className="my-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{event.eventName}</Card.Title>
              <Card.Text>{event.readableTime}</Card.Text>
              <Card.Text><Card.Link href={`/events/show/${event.id}`}>More Info</Card.Link></Card.Text>
              <Card.Text>
                {externalTag}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  });

  let create_event_tag = null;
  if (props.for === 'Company') {
    create_event_tag = (
      <div>
        <Button style={{ float: 'right' }} variant="primary" href={`/company/${storedUserInfo().profile.id}/create_event`}>Create New Event</Button>
        <br />
        <br />
      </div>
    );
  }
  return (
    <div>
      <Container>
        <br />
        {create_event_tag}
        <Row>
          <Col xs={3}>
            <Row className="my-3">
              <Col>
                <Card>
                  <Form inline>
                    <Card.Body>
                      <Card.Title>
                        Filters
                        <Button style={{ float: 'right' }} variant="secondary" onClick={resetForm}>Reset</Button>
                      </Card.Title>
                    </Card.Body>
                    <Card.Body class="list-group-item">
                      <Card.Text>Event Name</Card.Text>
                      <Card.Text>
                        <Form.Control type="text" name="eventName" onChange={handleOnChange} placeholder="Event Name" className="mr-sm-2" />
                      </Card.Text>
                    </Card.Body>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col>
            {eventsSection}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ShowEvents;
