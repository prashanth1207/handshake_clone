import React, { useState } from 'react';
import { Form, Button, Card, Alert} from 'react-bootstrap';
import {studentProfileSubmit} from './../../../utility'

function CareerObjectiveEdit(props) {
  let [errorMsg,seterrorMsg] = useState(null);

  let handleOnSubmit = async e => {
    e.preventDefault();
    let form = e.currentTarget;
    let formData = {
      studentProfile:{
        careerObjective: form.careerObjective.value
      }
    }
    let resp = await studentProfileSubmit(formData,props.studentProfile.id);
    if(resp.status === 200 && resp.data.success){
      props.setstateObj({
        state: 'show',
        studentProfile: Object.assign({},props.studentProfile,formData.studentProfile)
      })
    }else{
    seterrorMsg(<Alert variant='danger'>{resp.data.error}</Alert>)
    }
  }
  return (
    <Card>
      <Card.Body>
        <Card.Title>My Journey</Card.Title>
        {errorMsg}
        <Form onSubmit={handleOnSubmit}>
          <Card.Text>
            <Form.Label>What are you passionate about? What are you looking for on Handshake? What are your experiences or skills?</Form.Label>
            <Form.Control as='textarea' name='careerObjective' defaultValue={props.studentProfile.careerObjective}></Form.Control>
          </Card.Text>
          <Card.Text style={{textAlign: 'right'}}>
            <Button variant='secondary' onClick={e => props.setstateObj({state: 'show', studentProfile: props.studentProfile})}>Cancel</Button>&nbsp;
            <Button variant='primary' type='submit'>Update</Button>&nbsp;
          </Card.Text>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CareerObjectiveEdit;