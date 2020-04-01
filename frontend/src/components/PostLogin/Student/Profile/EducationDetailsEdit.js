import React, { useState } from 'react';
import {
  Form, Card, Button, Alert,
} from 'react-bootstrap';
import { DEGREES, MAJORS, studentProfileSubmit } from '../../../../utility';

function EducationDetailsEdit(props) {
  const [errorMsg, seterrorMsg] = useState(null);
  const educationDetails = props.studentProfile.educationDetails[0] || {};
  const degreeSelectionTag = DEGREES.map((degree) => <option key={degree} defaultValue={degree}>{degree}</option>);

  const majorSelectionTag = MAJORS.map((major) => <option key={major} defaultValue={major}>{major}</option>);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      educationDetails: {
        id: educationDetails.id,
        collegeName: form.collegeName.value,
        collegeLocation: form.collegeLocation.value,
        degree: form.degree.value,
        major: form.major.value,
        yearOfPassing: form.yearOfPassing.value,
        currentCgpa: form.currentCgpa.value,
        highestDegree: true,
      },
    };
    const resp = await studentProfileSubmit(formData, props.studentProfile._id);
    if (resp.status === 200 && resp.data.success) {
      props.studentProfile.educationDetails = [{ ...educationDetails, ...formData.educationDetails }];
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
        <Form onSubmit={handleSubmit}>
          <Card.Title>Education</Card.Title>
          {errorMsg}
          <Form.Group>
            <Form.Label>College Name</Form.Label>
            <Form.Control type="text" name="collegeName" defaultValue={educationDetails.collegeName} />
          </Form.Group>
          <Form.Group>
            <Form.Label>College Location</Form.Label>
            <Form.Control type="text" name="collegeLocation" defaultValue={educationDetails.collegeLocation} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Degree</Form.Label>
            <Form.Control as="select" name="degree" defaultValue={educationDetails.degree}>
              {degreeSelectionTag}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Major</Form.Label>
            <Form.Control as="select" name="major" defaultValue={educationDetails.major}>
              {majorSelectionTag}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Year Of Passing</Form.Label>
            <Form.Control type="number" pattern="[0-9]{4}" name="yearOfPassing" defaultValue={educationDetails.yearOfPassing} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Current Cgpa</Form.Label>
            <Form.Control type="number" step="any" name="currentCgpa" defaultValue={educationDetails.currentCgpa} />
          </Form.Group>
          <Card.Text style={{ textAlign: 'right' }}>
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

export default EducationDetailsEdit;
