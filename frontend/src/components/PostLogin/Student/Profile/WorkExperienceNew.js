import React, { useState } from 'react';
import WorkExperienceEdit from './WorkExperienceEdit';
import { Button } from 'react-bootstrap';

export default function WorkExperienceNew(props) {
  const [showStatus, setshowStatus] = useState('Button');
  const handleOnClick = () =>{
    setshowStatus('WorkExperienceEdit');
  }
  if(showStatus === 'WorkExperienceEdit'){
    return <WorkExperienceEdit experienceDetail={{studentProfile: props.studentProfileId}}/>
  }
  if(showStatus === 'Button'){
    return <Button variant="light" block onClick={handleOnClick}>
       Add Work Experience
    </Button>
  }
}
