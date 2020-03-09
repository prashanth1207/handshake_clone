import React, { useState } from 'react';
import axios from 'axios';
import './jobposting.css'
import { useParams } from 'react-router-dom';
import JobPostingSummary from './JobPostingSummary';
import {Row, Col, Card, Container} from 'react-bootstrap'
import ApplyForJobButton from './ApplyForJobButton';

function JobPostingShow(props) {
  let {id: jobPostingId} = useParams()
  let [jobPostingResp,setData] = useState({status: 'loading', jobPosting: null});
  if(jobPostingResp.status === 'loading'){
    axios.get(`http://localhost:3001/job_postings/${jobPostingId}`, { 
      validateStatus: false 
    }).then((resp)=>{
      if(resp.status === 200){
        setData({status: 'recordFound',jobPosting: resp.data});
      }else{
        setData({status: 'recordNotFound'});
      }
    })
  }
  if(jobPostingResp.status === 'loading'){
    return <h3>Loading Profile...</h3>
  }else if(jobPostingResp.status === 'recordNotFound'){
    return <h3>Profile Not Found</h3>
  }

  let jobPosting = jobPostingResp.jobPosting;
  return (
    <Container>
     <Row className="m-3">
        <Col>
          <JobPostingSummary jobPosting={jobPosting}/>
        </Col>
     </Row>
     <Row className="m-3">
       <Col>
        <Card>
          <Card.Body>
            <Card.Text><span style={{float: 'left'}}>Applications close on {jobPosting.readableDeadline}</span><span style={{float: 'right'}}><ApplyForJobButton jobPostingId={jobPostingId} /></span>
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