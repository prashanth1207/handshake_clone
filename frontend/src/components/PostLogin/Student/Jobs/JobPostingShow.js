import React, { useState } from 'react';
import axios from 'axios';
//import './jobposting.css';
import { useParams } from 'react-router-dom';
import {
  Row, Col, Card, Container,
} from 'react-bootstrap';
import JobPostingSummary from './JobPostingSummary';
import { rooturl } from '../../../../config/config';
import ApplyForJobButton from './ApplyForJobButton';
import { JobPostingQuery } from '../../../../graphql/queries/jobPosting';
import { useQuery } from 'react-apollo';

function JobPostingShow(props) {
  const { id: jobPostingId } = useParams();
  const {loading, error, data} = useQuery(JobPostingQuery,{variables: {id: jobPostingId}});
  
  if (loading) {
    return <h3>Loading Profile...</h3>;
  } if (error) {
    return <h3>Job Not Found</h3>;
  }

  const jobPosting = (data && data.jobPosting) || {};
  return (
    <Container>
      <Row className="m-3">
        <Col>
          <JobPostingSummary jobPosting={jobPosting} />
        </Col>
      </Row>
      <Row className="m-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Text>
                <span style={{ float: 'left' }}>
                  Applications close on
                  {jobPosting.readableDeadline}
                </span>
                <span style={{ float: 'right' }}><ApplyForJobButton jobPostingId={jobPostingId} /></span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="m-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Job Description</Card.Title>
              <Card.Text>{jobPosting.jobDescription}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  );
}

export default JobPostingShow;
