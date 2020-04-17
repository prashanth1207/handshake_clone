import React, { useState } from 'react';
import EducationDetailsEdit from './EducationDetailsEdit';
import { Button } from 'react-bootstrap';

export default function EducationDetailNew(props) {
  const [showStatus, setshowStatus] = useState('Button');
  const handleOnClick = () =>{
    setshowStatus('EducationDetailsEdit');
  }
  if(showStatus === 'EducationDetailsEdit'){
    return <EducationDetailsEdit educationDetail={{studentProfile: props.studentProfileId}}/>
  }
  if(showStatus === 'Button'){
    return <Button variant="light" block onClick={handleOnClick}>
      Add School
    </Button>
  }
}
