import React from 'react';
import EditProfileSvg from './../../EditProfileSvg'
import {Card, Button} from 'react-bootstrap'

export default function WorkExperience(props){
  let experienceDetails = props.experienceDetails;
  return(
    <Card>
      <Card.Body>
        <div>
          <Button variant='link' style={{float: 'right', width:'10px'}}>
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
  )
}