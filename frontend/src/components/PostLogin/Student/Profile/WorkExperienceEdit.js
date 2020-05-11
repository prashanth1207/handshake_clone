import React, { useState } from 'react';
import {
  Form, Card, Button, Alert,
} from 'react-bootstrap';
import { studentProfileSubmit } from '../../../../utility';

function WorkExperienceEdit(props) {
  const [errorMsg, seterrorMsg] = useState(null);
  const experienceDetails = props.studentProfile.experienceDetails[0] || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      experienceDetails: {
        id: experienceDetails.id,
        companyName: form.companyName.value,
        title: form.title.value,
        companyLocation: form.companyLocation.value,
        startDate: form.startDate.value,
        endDate: form.endDate.value,
        workDescription: form.workDescription.value,
      },
    };
    const resp = await studentProfileSubmit(formData, props.studentProfile.id);
    if (resp.status === 200 && resp.data.success) {
      props.studentProfile.experienceDetails = [{ ...experienceDetails, ...formData.experienceDetails }];
      props.setstateObj({
        state: 'show',
        studentProfile: props.studentProfile,
      });
    } else {
      seterrorMsg(<Alert variant="danger">{resp.data.error}</Alert>);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Work Experience</Card.Title>
        <Form onSubmit={handleSubmit}>
          {errorMsg}
          <Card.Text>
            <Form.Group>
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" name="companyName" defaultValue={experienceDetails.companyName} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" defaultValue={experienceDetails.title} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company Location</Form.Label>
              <Form.Control type="text" name="companyLocation" defaultValue={experienceDetails.companyLocation} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" name="startDate" defaultValue={experienceDetails.startDate} />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" name="endDate" defaultValue={experienceDetails.endDate} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Work Description</Form.Label>
              <Form.Control as="textarea" name="workDescription" defaultValue={experienceDetails.workDescription} />
            </Form.Group>
          </Card.Text>
          <Card.Text>
            <Button variant="secondary" onClick={(e) => props.setstateObj({ state: 'show', studentProfile: props.studentProfile })}>Cancel</Button>
&nbsp;
            <Button variant="primary" type="submit">Update</Button>
&nbsp;
          </Card.Text>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default WorkExperienceEdit;
