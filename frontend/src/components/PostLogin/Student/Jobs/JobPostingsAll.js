import React, { useState } from 'react';
import axios from 'axios';
import {
  Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import JobPostingSummary from './JobPostingSummary';
import { rooturl } from '../../../../config/config';
import MyPagination from '../../Common/MyPagination';



function JobPostingsAll(props) {
  let perPage = 10;
  const { companyProfileId } = props;
  const [jobPostingResp, setData] = useState({ 
    status: 'loading', 
    jobPostings: null, 
    currentPage: 1, 
    totalPages: null
  });
  if (jobPostingResp.status === 'loading') {
    console.dir(props);
    axios.get(`${rooturl}/job_postings`, { params: {
      page: 1,
      perPage: perPage,
      companyProfile: companyProfileId 
    } }, {
      validateStatus: false,
    }).then((resp) => {
      if (resp.status === 200) {
        setData({ 
          status: 'recordFound', 
          jobPostings: resp.data,
          currentPage: 1,
          totalPages: Math.ceil(resp.data.totalRecords / perPage),
        });
      } else {
        setData({ status: 'recordNotFound' });
      }
    });
  }



  const handleOnChange = (e,page=1,formElement=null) => {
    const form = formElement || e.currentTarget.form;
    const queryData = {
      page: page,
      perPage: perPage,
      jobTitle: form.jobTitle.value,
      jobCategory: form.jobCategory.value,
      location: form.location.value,
    };
    axios.get(`${rooturl}/job_postings`, { params: queryData }, { validateStatus: false }).then((resp) => {
      if (resp.status === 200) {
        setData({ 
          status: 'recordFound', 
          jobPostings: resp.data, 
          currentPage: queryData.page,
          totalPages: Math.ceil(resp.data.totalRecords / perPage),
        });
      } else {
        setData({ 
          status: 'error', 
          jobPostings: null,
          currentPage: queryData.page,
          totalPages: null
        });
      }
    });
  };

  const handlePrevPage = () =>{
    if(jobPostingResp.currentPage === 1){
      return
    }
    let form = document.getElementById('jobPostingForm');
    handleOnChange(null,jobPostingResp.currentPage - 1,form);
  }

  const handleNextPage = () =>{
    if(jobPostingResp.currentPage === jobPostingResp.totalPages){
      return
    }
    let form = document.getElementById('jobPostingForm');
    handleOnChange(null,jobPostingResp.currentPage + 1,form);
  }

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
  const jobPostingsDivs = jobPostings.data.map((jobPosting) => (
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
                <Form id='jobPostingForm'>
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
          <MyPagination handlePrevPage={handlePrevPage} currentPage={jobPostingResp.currentPage} totalPages={jobPostingResp.totalPages} handleNextPage={handleNextPage}/>
        </Col>
      </Row>
    </div>
  );
}

export default JobPostingsAll;
