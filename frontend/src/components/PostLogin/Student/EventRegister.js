import React, { useState } from 'react';
import { Badge, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { rooturl } from '../../../config/config';


function EventRegister(props) {
  const { event, studentProfileId } = props;
  const [registered, setregistered] = useState(event.registered);
  if (registered) {
    return <Badge variant="success">Registered</Badge>;
  }
  if (event.eligibility !== 'All' && props.studentMajor !== event.eligibility) {
    return <Badge variant="secondary">Not eligibile</Badge>;
  }
  if (new Date(event.time).getTime() < new Date().getTime()) {
    return <Badge variant="info">Expired</Badge>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger
    const formData = {
      eventId: event.id,
      studentProfileId: studentProfileId,
    };
    axios.post(`${rooturl}/event_registrations`, formData, { validateStatus: false })
      .then((resp) => {
        if (resp.status === 200 && resp.data.success) {
          setregistered(true);
        }
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default EventRegister;
