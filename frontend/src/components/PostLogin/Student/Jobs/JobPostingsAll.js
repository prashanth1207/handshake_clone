import React, { useState } from 'react';
import axios from 'axios';
import {
  Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import JobPostingSummary from './JobPostingSummary';
import { rooturl } from '../../../../config/config';
import {JobPostings} from '../../../../graphql/queries/jobPosting'
import { useLazyQuery } from 'react-apollo';


function JobPostingsAll(props) {
  const { companyProfileId } = props;
  const [jobPostingsQuery, {loading, error, data}] = useLazyQuery(JobPostings);

  if (!loading && data === undefined) {
    jobPostingsQuery({variables: {}});
  }

  const handleOnChange = (e) => {
    const { form } = e.currentTarget;
    const queryData = {
    };
    jobPostingsQuery({variables: {
      jobTitle: form.jobTitle.value,
      jobCategory: form.jobCategory.value,
      companyName: form.companyName.value,
    }})
  };

  const resetForm = (e) => {
    e.currentTarget.form.reset();
    handleOnChange(e);
  };


  const jobPostings  = (data && data.jobPostings) || [];
  console.dir(jobPostings);
  const jobPostingsDivs = jobPostings.map((jobPosting) => (
    <Row className="my-3">
      <Col>
        <JobPostingSummary jobPosting={jobPosting} linkJobTitle />
      </Col>
    </Row>
  ));

  return (
    <div>
      <br />
      <Row>
        <Col xs={3}>
          <Row className="my-3">
            <Col>
              <Card>
                <Form inline>
                  <Card.Body>
                    <Card.Title>
                      Filters
                      <Button style={{ float: 'right' }} variant="secondary" onClick={resetForm}>Reset</Button>
                    </Card.Title>
                  </Card.Body>
                  <Card.Body class="list-group-item">
                    <Card.Text>Title</Card.Text>
                    <Card.Text>
                      <Form.Control type="text" name="jobTitle" onChange={handleOnChange} placeholder="Job Title" className="mr-sm-2" />
                    </Card.Text>
                  </Card.Body>
                  <Card.Body class="list-group-item" style={{width: '100%'}}>
                    <Card.Text>Category</Card.Text>
                    <Card.Text>
                      <Form.Control as="select" name="jobCategory" onChange={handleOnChange} placeholder="Full Time, Part Time" style={{width: '100%'}}>
                      <option key='' value=''>All</option>
                        <option key='Full Time' value='Full Time'>Full Time</option>
                        <option key='Part Time' value='Part Time'>Part Time</option>
                        <option key='Internship' value='Internship'>Internship</option>
                      </Form.Control>
                    </Card.Text>
                  </Card.Body>
                  <Card.Body class="list-group-item">
                    <Card.Text>Comapny Name</Card.Text>
                    <Card.Text>
                      <Form.Control type="text" name="companyName" onChange={handleOnChange} placeholder="Company Name" className="mr-sm-2" />
                    </Card.Text>
                  </Card.Body>
                </Form>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col>
          {jobPostingsDivs}
        </Col>
      </Row>
    </div>
  );
}

export default JobPostingsAll;
