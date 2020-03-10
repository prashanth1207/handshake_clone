import React, { useState } from 'react';
import JobPostingSummary from './JobPostingSummary'
import axios from 'axios';
import {Row, Col,Card, Form,Button} from 'react-bootstrap';


function JobPostingsAll(props) {
  let companyProfileId = props.companyProfileId;
  let [jobPostingResp,setData] = useState({status: 'loading', jobPostings: null});
  if(jobPostingResp.status === 'loading'){
    console.dir(props)
    axios.get(`http://localhost:3001/job_postings`, {params: {companyProfileId: companyProfileId}},{ 
      validateStatus: false 
    }).then((resp)=>{
      if(resp.status === 200){
        setData({status: 'recordFound',jobPostings: resp.data});
      }else{
        setData({status: 'recordNotFound'});
      }
    })
  }

  let handleOnChange = (e) =>{
    let form = e.currentTarget.form;
    let queryData = {
      jobCategory: form.jobCategory.value,
      location: form.location.value,
    }
    axios.get('http://localhost:3001/job_postings',{params: queryData},{validateStatus: false}).then(resp => {
      if(resp.status == 200){
        setData({status: 'recordFound',jobPostings: resp.data});
      }else{
        setData({status: 'error',jobPostings: null});
      }
    })
  }

  let resetForm = (e) =>{
    e.currentTarget.form.reset();
    handleOnChange(e);
  }

  if(jobPostingResp.status === 'loading' || jobPostingResp.status === 'reloading'){
    return <h3>Loading Job Postings...</h3>
  }else if(jobPostingResp.status === 'recordNotFound'){
    return <h3>Something went wrong..</h3>
  }
  
  
  let jobPostings = jobPostingResp.jobPostings;
  console.dir(jobPostings)
  let jobPostingsDivs = jobPostings.map(jobPosting =>{
    return <Row className='my-3'>
      <Col>
        <JobPostingSummary jobPosting={jobPosting} linkJobTitle={true}/>
      </Col>
    </Row>
  });

  return (
    <div>
      <br/>
      <Row>
      <Col xs={3}>
          <Row className='my-3'>
            <Col>
              <Card>
                <Form inline>
                <Card.Body>
                  <Card.Title>Filters<Button style={{float: 'right'}} variant='secondary' onClick={resetForm}>Reset</Button></Card.Title>
                </Card.Body>
                  <Card.Body class='list-group-item'>
                    <Card.Text>Category</Card.Text>
                    <Card.Text>
                      <Form.Control type="text" name='jobCategory' onChange={handleOnChange} placeholder="Full Time, Part Time" className="mr-sm-2" />
                    </Card.Text>
                  </Card.Body>
                  <Card.Body class='list-group-item'>
                    <Card.Text>Location</Card.Text>
                    <Card.Text>
                      <Form.Control type="text" name='location' onChange={handleOnChange} placeholder="Job Location" className="mr-sm-2" />
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