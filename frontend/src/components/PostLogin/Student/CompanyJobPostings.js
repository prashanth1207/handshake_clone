import React, { useState } from 'react';
import JobPostingSummary from './JobPostingSummary'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function CompanyJobPostings(props) {
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
  if(jobPostingResp.status === 'loading'){
    return <h3>Loading Job Postings...</h3>
  }else if(jobPostingResp.status === 'recordNotFound'){
    return <h3>Something went wrong..</h3>
  }
  let jobPostings = jobPostingResp.jobPostings;
  console.dir(jobPostings)
  let jobPostingsDivs = jobPostings.map(jobPosting =>{
    return(
      <div>
      <JobPostingSummary jobPosting={jobPosting} linkJobTitle={true}/>
      sdcvsdvsdvsvsdvs
      <Button variant="link" href={`/${companyProfileId}/job_postings/${jobPosting.id}/job_applications`}>
        Job applications
      </Button>
      </div>
    )
  });
  return (
    <div class="clearfix new-topbar-nux style__container___15r1p style__large___3HKaH style__fitted___2ndoo">
      {jobPostingsDivs}
    </div>
  );
}

export default CompanyJobPostings;