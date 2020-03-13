import React, { useState } from 'react';
import {
  Container, Row, Col, Form, Button, Alert,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { rooturl } from '../../../config/config';
import axios from 'axios';

function ApplyForJobForm(props) {
  const { studentProfileId, id: jobProfileId } = useParams();
  const [submitStatus, setsubmitStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('jobPostingId', jobProfileId);
    formData.append('studentProfileId', studentProfileId);
    formData.append('resume', e.currentTarget.elements.resume.files[0]);
    axios.post(`${rooturl}/job_application/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((resp) => {
        if (resp.status === 200 && resp.data.success) {
          setsubmitStatus('success');
        } else {
          setErrorMsg(resp.data.error);
        }
      });
  };
  if (submitStatus == 'success') {
    return (
      <div>
        <Alert key="success" variant="success">
          Application submitted successfully!
        </Alert>
      </div>
    );
  }
  let errorTag = null;
  if (errorMsg) {
    errorTag = (
      <Alert key="danger" variant="danger">
        {errorMsg}
      </Alert>
    );
  }
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            {errorTag}
            <h2>Apply for Job</h2>
            <Form.Group>
              <Form.Label>Upload your Resume</Form.Label>
              <Form.Control type="file" name="resume" required accept=".pdf" />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ApplyForJobForm;
