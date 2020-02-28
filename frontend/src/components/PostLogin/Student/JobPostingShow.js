import React, { useState } from 'react';
import axios from 'axios';
import './jobposting.css'
import { useParams } from 'react-router-dom';
import JobPostingSummary from './JobPostingSummary';

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
    <div class="clearfix new-topbar-nux style__container___15r1p style__large___3HKaH style__fitted___2ndoo">
      <JobPostingSummary jobPosting={jobPosting}/>
      <div class="style__card___1rhof" >
        <div class="style__card-item___B1f7m style__large___Kv76x">
          <div class="style__content___3uV9M">
            <div class="style__status___1CX3r">
              <div class="style__text___2ilXR style__large___3qwwG style__semibold___3bkz0">
  <div>Applications close on {jobPosting.readableDeadline}</div>
              </div>
            </div>
            <div class="style__button___2JdqY"><span><button class="style__base___hEhR9 style__primary___1JMHS"><span>Apply</span></button></span></div>
          </div>
        </div>
      </div>
      <div class="style__row___273Yw">
        <div class="style__col___3BbK4 style__col-md-12___17nuz">
          <div class="style__card___1rhof" >
            <div class="style__card-item___B1f7m style__large___Kv76x">
              <h2 class="style__heading___29i1Z style__extra-large___PY8Kd">
                <div class="style__flex___fCvpa">
                  <div class="style__flex-item___2eWZ4">Job Description</div>
                </div>
              </h2>
              <div class="style__job-description___17MNY">
                <div class="style__text___2ilXR style__large___3qwwG">
                  {jobPosting.jobDescription}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobPostingShow;