import React, { useState } from 'react';
import {Badge, Form, Button} from 'react-bootstrap'
import axios from 'axios';

function EventRegister(props) {
  let {studentProfileId,eventId} = props;
  let [registered,setregistered] = useState(props.registered);

  if(registered){
    return <Badge variant="success">Registered</Badge>
  }

  let handleSubmit = (e) =>{
    e.preventDefault();
    let formData = {
      eventId: eventId,
      studentProfileId: studentProfileId
    }
    axios.post('http://localhost:3001/event_registrations',formData,{validateStatus: false})
      .then(resp =>{
        if(resp.status == 200 && resp.data.success){
          setregistered(true)
        }
      })
  }

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