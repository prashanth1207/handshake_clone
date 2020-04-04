import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import JobPostingSummary from '../../Student/Jobs/JobPostingSummary';
import { storedUserInfo } from '../../../../utility';
import { rooturl } from '../../../../config/config';
import MyPagination from '../../Common/MyPagination';


function CompanyJobPostings(props) {
  let perPage = 10;
  const companyProfileId = storedUserInfo().profile._id;
  const [jobPostingResp, setData] = useState({ 
    status: 'loading', 
    jobPostings: null,
    currentPage: 1,
    totalPages: null
  });
  if (jobPostingResp.status === 'loading') {
    console.dir(props);
    axios.get(`${rooturl}/job_postings`, { params: { 
      companyProfile: companyProfileId,
      page: jobPostingResp.currentPage,
      perPage: perPage
    }}, {
      validateStatus: false,
    }).then((resp) => {
      if (resp.status === 200) {
        setData({ 
          status: 'recordFound', 
          jobPostings: resp.data,
          currentPage: jobPostingResp.currentPage,
          totalPages: Math.ceil(resp.data.totalRecords / perPage),
        });
      } else {
        setData({ status: 'recordNotFound' });
      }
    });
  }
  const handlePrevPage = () =>{
    if(jobPostingResp.currentPage === 1){
      return
    }
    setData({
      status: 'loading', 
      jobPostings: null,
      currentPage: jobPostingResp.currentPage - 1,
      totalPages: null
    })
  }

  const handleNextPage = () =>{
    if(jobPostingResp.currentPage === jobPostingResp.totalPages){
      return
    }
    setData({
      status: 'loading', 
      jobPostings: null,
      currentPage: jobPostingResp.currentPage + 1,
      totalPages: null
    })
  }

  if (jobPostingResp.status === 'loading') {
    return <h3>Loading Job Postings...</h3>;
  } if (jobPostingResp.status === 'recordNotFound') {
    return <h3>Something went wrong..</h3>;
  }
  const { jobPostings } = jobPostingResp;
  console.dir(jobPostings);
  let jobPostingsDivs = jobPostings.data.map((jobPosting) => {
    let jobApplicationTag = (
      <Button style={{ float: 'right' }} variant="link" href={`/${companyProfileId}/job_postings/${jobPosting._id}/job_applications`}>
        Job applications
      </Button>
    );
    return (
      <div>
        <JobPostingSummary jobPosting={jobPosting} linkJobTitle jobApplications={jobApplicationTag} />
      </div>
    );
  });
  jobPostingsDivs = jobPostingsDivs.length > 0 ? jobPostingsDivs : <h2>No Jobs Posted</h2>;
  return (
    <div className="clearfix new-topbar-nux style__container___15r1p style__large___3HKaH style__fitted___2ndoo">
      <br />
      <Button style={{ float: 'right' }} variant="primary" href={`/company/${companyProfileId}/create/job_postings`}>Create New Job</Button>
      <br />
      <br />
      {jobPostingsDivs}
      <MyPagination handlePrevPage={handlePrevPage} currentPage={jobPostingResp.currentPage} totalPages={jobPostingResp.totalPages} handleNextPage={handleNextPage}/>
    </div>
  );
}

export default CompanyJobPostings;
