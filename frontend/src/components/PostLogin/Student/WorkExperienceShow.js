import React from 'react';
import EditProfileSvg from './../../EditProfileSvg'
import {Card, Button} from 'react-bootstrap'

function WorkExperienceShow(props) {
  let experienceDetails = props.studentProfile.experienceDetails[0] || {};
  return (
    <Card>
      <Card.Body>
        <div>
          <Button variant='link' onClick={e => props.setstateObj({state: 'edit', studentProfile: props.studentProfile})} style={{float: 'right', width:'10px'}}>
              <EditProfileSvg/>
          </Button>
        </div>
        <Card.Title>Work Experience</Card.Title>
        <Card.Text>
          <h5>{experienceDetails.companyName}</h5>
          <div>{experienceDetails.title}</div>
          <div>{experienceDetails.readableStartDate} - {experienceDetails.readableEndDate}</div>
          <div>{experienceDetails.location}</div>
          <div>{experienceDetails.workDescription}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default WorkExperienceShow;