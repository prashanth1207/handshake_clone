import React, { useState } from 'react';
import {
  Form, Card, Button, Alert,
} from 'react-bootstrap';
import { experienceDetailEdit,experienceDetailDelete } from './../../../../redux/studentProfile/studentProfileActions';
import {connect} from 'react-redux';

function WorkExperienceEdit(props) {
  const [errorMsg, seterrorMsg] = useState(null);
  const experienceDetail = props.experienceDetail;

  const handleDelete = async (e) => {
    props.experienceDetailDelete(props.experienceDetail._id)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      id: experienceDetail._id,
      studentProfile: props.experienceDetail.studentProfile,
      companyName: form.companyName.value,
      title: form.title.value,
      companyLocation: form.companyLocation.value,
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      workDescription: form.workDescription.value,
    };
    props.experienceDetailEdit(formData);
  };

  let deleteButtonTag = experienceDetail._id && <Button variant="danger" onClick={handleDelete}>Delete</Button>

  return (
    <Form onSubmit={handleSubmit}>
      {errorMsg}
      <Card.Text>
        <Form.Group>
          <Form.Label>Company Name</Form.Label>
          <Form.Control type="text" name="companyName" defaultValue={experienceDetail.companyName} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" defaultValue={experienceDetail.title} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Company Location</Form.Label>
          <Form.Control type="text" name="companyLocation" defaultValue={experienceDetail.companyLocation} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Start Date</Form.Label>
          <Form.Control type="date" name="startDate" defaultValue={experienceDetail.startDate &&new Date(experienceDetail.startDate).toISOString().split('T')[0]} />
        </Form.Group>
        <Form.Group>
          <Form.Label>End Date</Form.Label>
          <Form.Control type="date" name="endDate" defaultValue={experienceDetail.endDate && new Date(experienceDetail.endDate).toISOString().split('T')[0]} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Work Description</Form.Label>
          <Form.Control as="textarea" name="workDescription" defaultValue={experienceDetail.workDescription} />
        </Form.Group>
      </Card.Text>
      <Card.Text>
        {deleteButtonTag}
        <Button variant="secondary" onClick={(e) => props.setstateObj({ state: 'show', experienceDetail: props.experienceDetail })}>Cancel</Button>
&nbsp;
        <Button variant="primary" type="submit">Update</Button>
&nbsp;
      </Card.Text>
    </Form>
  );
}

export default connect(null,{ experienceDetailEdit,experienceDetailDelete })(WorkExperienceEdit);
