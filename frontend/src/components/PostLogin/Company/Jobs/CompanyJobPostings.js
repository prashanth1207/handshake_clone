import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import JobPostingSummary from '../../Student/Jobs/JobPostingSummary';
import { storedUserInfo } from '../../../../utility';
import { rooturl } from '../../../../config/config';
import { useQuery } from 'react-apollo';
import {JobPostings} from '../../../../graphql/queries/jobPosting';

function CompanyJobPostings(props) {
  const companyProfileId = storedUserInfo().profile.id;
  const {loading,error,data} = useQuery(JobPostings,{
    variables: {
      companyProfileId: companyProfileId
    }
  });
  const [jobPostingResp, setData] = useState({ status: 'loading', jobPostings: null });
  if (loading) {
    return <h3>Loading Job Postings...</h3>;
  } if (!loading && error) {
    return <h3>Something went wrong..</h3>;
  }
  let jobPostingsDivs = data.jobPostings.map((jobPosting) => {
    let jobApplicationTag = (
      <Button style={{ float: 'right' }} variant="link" href={`/${companyProfileId}/job_postings/${jobPosting.id}/job_applications`}>
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
    </div>
  );
}

export default CompanyJobPostings;
