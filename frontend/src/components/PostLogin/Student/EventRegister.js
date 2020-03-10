import React, { useState } from 'react';
import {Badge, Form, Button} from 'react-bootstrap'
import axios from 'axios';

function EventRegister(props) {
  let event = props.event;
  let {studentProfileId,eventId} = props;
  let [registered,setregistered] = useState(event.registered);
  if(registered){
    return <Badge variant="success">Registered</Badge>
  }
  if(event.eligibility != 'All' && props.studentMajor != event.eligibility){
    return <Badge variant='secondary'>Not eligibile</Badge>
  }
  if(new Date(event.time).getTime() < new Date().getTime()){
    return <Badge variant='info'>Expired</Badge>
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