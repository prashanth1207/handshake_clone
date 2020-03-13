import React, { useState } from 'react';
import axios from 'axios';
import {
  Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import JobPostingSummary from './JobPostingSummary';
import { rooturl } from '../../../config/config';



function JobPostingsAll(props) {
  const { companyProfileId } = props;
  const [jobPostingResp, setData] = useState({ status: 'loading', jobPostings: null });
  if (jobPostingResp.status === 'loading') {
    console.dir(props);
    axios.get(`${rooturl}/job_postings`, { params: { companyProfileId } }, {
      validateStatus: false,
    }).then((resp) => {
      if (resp.status === 200) {
        setData({ status: 'recordFound', jobPostings: resp.data });
      } else {
        setData({ status: 'recordNotFound' });
      }
    });
  }

  const handleOnChange = (e) => {
    const { form } = e.currentTarget;
    const queryData = {
      jobCategory: form.jobCategory.value,
      location: form.location.value,
    };
    axios.get(`${rooturl}/job_postings`, { params: queryData }, { validateStatus: false }).then((resp) => {
      if (resp.status === 200) {
        setData({ status: 'recordFound', jobPostings: resp.data });
      } else {
        setData({ status: 'error', jobPostings: null });
      }
    });
  };

  const resetForm = (e) => {
    e.currentTarget.form.reset();
    handleOnChange(e);
  };

  if (jobPostingResp.status === 'loading' || jobPostingResp.status === 'reloading') {
    return <h3>Loading Job Postings...</h3>;
  } if (jobPostingResp.status === 'recordNotFound') {
    return <h3>Something went wrong..</h3>;
  }


  const { jobPostings } = jobPostingResp;
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
                    <Card.Text>Category</Card.Text>
                    <Card.Text>
                      <Form.Control type="text" name="jobCategory" onChange={handleOnChange} placeholder="Full Time, Part Time" className="mr-sm-2" />
                    </Card.Text>
                  </Card.Body>
                  <Card.Body class="list-group-item">
                    <Card.Text>Location</Card.Text>
                    <Card.Text>
                      <Form.Control type="text" name="location" onChange={handleOnChange} placeholder="Job Location" className="mr-sm-2" />
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
