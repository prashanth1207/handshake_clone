import React, { useState } from 'react';
import {
  Form, Card, Button, Alert,
} from 'react-bootstrap';
import { DEGREES, MAJORS, studentProfileSubmit } from '../../../../utility';
import { educationDetailEdit,educationDetailDelete } from './../../../../redux/studentProfile/studentProfileActions';
import {connect} from 'react-redux';

function EducationDetailsEdit(props) {
  const [errorMsg, seterrorMsg] = useState(null);
  const educationDetail = props.educationDetail;
  const degreeSelectionTag = DEGREES.map((degree) => <option key={degree} defaultValue={degree}>{degree}</option>);
  const majorSelectionTag = MAJORS.map((major) => <option key={major} defaultValue={major}>{major}</option>);

  const handleDelete = async (e) => {
    props.educationDetailDelete(props.educationDetail._id)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      id: educationDetail._id,
      studentProfile: props.educationDetail.studentProfile,
      collegeName: form.collegeName.value,
      collegeLocation: form.collegeLocation.value,
      degree: form.degree.value,
      major: form.major.value,
      yearOfPassing: form.yearOfPassing.value,
      currentCgpa: form.currentCgpa.value,
      highestDegree: true//form.highestDegree.value,
    };
    props.educationDetailEdit(formData);
  };
  let deleteButtonTag = educationDetail._id && <Button variant="danger" onClick={handleDelete}>Delete</Button>

  return (
    <Form onSubmit={handleSubmit}>
      <Card.Title>Education</Card.Title>
      {errorMsg}
      <Form.Group>
        <Form.Label>College Name</Form.Label>
        <Form.Control type="text" name="collegeName" defaultValue={educationDetail.collegeName} />
      </Form.Group>
      <Form.Group>
        <Form.Label>College Location</Form.Label>
        <Form.Control type="text" name="collegeLocation" defaultValue={educationDetail.collegeLocation} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Degree</Form.Label>
        <Form.Control as="select" name="degree" defaultValue={educationDetail.degree}>
          {degreeSelectionTag}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Major</Form.Label>
        <Form.Control as="select" name="major" defaultValue={educationDetail.major}>
          {majorSelectionTag}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Year Of Passing</Form.Label>
        <Form.Control type="number" pattern="[0-9]{4}" name="yearOfPassing" defaultValue={educationDetail.yearOfPassing} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Current Cgpa</Form.Label>
        <Form.Control type="number" step="any" name="currentCgpa" defaultValue={educationDetail.currentCgpa} />
      </Form.Group>
      <Card.Text style={{ textAlign: 'right' }}>
        {deleteButtonTag}
        <Button variant="secondary" onClick={(e) => props.setstateObj({ state: 'show', studentProfile: props.studentProfile })}>Cancel</Button>
&nbsp;
        <Button variant="primary" type="submit">Update</Button>
&nbsp;
      </Card.Text>
    </Form>
  );
}

export default connect(null,{educationDetailEdit,educationDetailDelete})(EducationDetailsEdit);
