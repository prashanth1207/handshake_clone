import React, { useState } from 'react';
import {Button} from 'react-bootstrap'
import axios from 'axios'
import {storedUserInfo} from '../../../utility'

function ApplyForJobButton(props) {
  let usrInfo = storedUserInfo();
  let [status,setStatus] = useState(null);

  if(status === null){
      axios.post('http://localhost:3001/job_application/status',{studentProfileId: usrInfo.profile.id, jobPostingId: props.jobPostingId})
        .then(resp => {
          setStatus(resp.data.status)
        })
  }

  if(status === null){
    return null;
  }
  if(status === 'Not Applied'){
    return <Button variant="primary" href={`/student/${usrInfo.profile.id}/job_postings/${props.jobPostingId}/apply`}>Apply</Button>
  }
  return (
    <div>
      <Button variant="primary">{status}</Button>
    </div>
  );
}

export default ApplyForJobButton;