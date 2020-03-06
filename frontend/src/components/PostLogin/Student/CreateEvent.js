import React, { useState } from 'react';
import {Form, Button, Alert} from 'react-bootstrap'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CreateEvent(props) {
  let [submitted,setsubmitted] = useState(false);
  let [errorMsg,setErrorMsg] = useState(null);
  let {companyProfileId} = useParams();
  let handleSubmit = (e) => {
    e.preventDefault();
    let formData = null;
    let form = e.currentTarget;
    formData = {
      companyProfileId: companyProfileId,
      eventName: form.eventName.value,
      description: form.description.value,
      time: form.time.value,
      location: form.location.value,
      eligibility: form.eligibility.value
    }
    axios.post(`http://localhost:3001/events`,formData,{validateStatus: false}).then(resp =>{
      if(resp.status == 200 & resp.data.success){
        setsubmitted(true);
      }else{
        setErrorMsg(resp.data.error);
      }
    })
  }
  if(submitted){
    return <Alert variant='success'>
        Event created successfully!
      </Alert>
  }
  let errTag = null;
  if(errorMsg){
    errTag = <Alert variant='danger'>
      {errorMsg}
    </Alert>
  }
  return (
    <div>
      <h2>Create an Event</h2>
      {errTag}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Event name</Form.Label>
          <Form.Control type='text' name='eventName' required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name='description' required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Event Date and Time</Form.Label>
          <Form.Control type='datetime-local' name='time' required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control type='text' name='location' required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Eligibility – All, specific major</Form.Label>
          <Form.Control type='text' name='eligibility' required/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateEvent;