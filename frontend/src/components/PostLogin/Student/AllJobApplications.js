import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Card, Modal, Button,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import StudentBody from './StudentBody';
import JobApplicationStatus from './JobApplicationStatus';

function AllJobApplications(props) {
  const { id: jobPostingId } = useParams();
  const [jobApplicationsResp, setjobApplicationsResp] = useState({ status: 'loading', jobApplications: null });
  const [studentProfile, setStudentProfile] = useState(null);
  if (jobApplicationsResp.status === 'loading') {
    axios.get(`http://localhost:3001/job_application?jobPostingId=${jobPostingId}`)
      .then((resp) => {
        setjobApplicationsResp({ status: 'loaded', jobApplications: resp.data.data || [] });
      });
  }
  if (jobApplicationsResp.status === 'loading') {
    return <div>Loading...</div>;
  }

  const handleViewProfile = (e) => {
    e.preventDefault();
    const studentProfileId = e.target.id;
    const profile = (
      <Modal show onHide={handleClose} className="modal-70w">
        <Modal.Header closeButton>
          <Modal.Title>Student Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StudentBody studentProfileId={studentProfileId} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
    setStudentProfile(profile);
  };

  let handleClose = () => {
    setStudentProfile(null);
  };

  const jobApplication_tag = jobApplicationsResp.jobApplications.map((jobApplication) => (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>
              {jobApplication.studentProfile.firstName}
              {' '}
              {jobApplication.studentProfile.lastName}
            </Card.Title>
            <Card.Text>
              Applied on
              {new Date(jobApplication.createdAt).toLocaleString('en-US', { dateStyle: 'full' })}
            </Card.Text>
            <Card.Text>
              <Card.Link target="_blank" href={`http://localhost:3001/resume/${jobApplication.resumePath}`} id={jobApplication.studentProfileId}>Resume</Card.Link>
            </Card.Text>
            <Card.Text><JobApplicationStatus jobApplication={jobApplication} /></Card.Text>
            <Card.Text>
              <Card.Link href="#" id={jobApplication.studentProfileId} onClick={handleViewProfile}>View Profile</Card.Link>
            </Card.Text>

          </Card.Body>
        </Card>
      </Col>
    </Row>
  ));
  return (
    <Container>
      <h2>Applied Students</h2>
      {jobApplication_tag}
      {studentProfile}
    </Container>
  );
}

export default AllJobApplications;
