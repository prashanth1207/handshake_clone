import React from 'react';
import EditProfileSvg from './../../EditProfileSvg'
import {Card, Button} from 'react-bootstrap'

export default function EducationDetails(props){
  let educationDetails = props.educationDetails
  return(
    <Card>
      <Card.Body>
        <div>
          <Button variant='link' style={{float: 'right', width:'10px'}}>
            <EditProfileSvg/>
          </Button>
        </div>
        <Card.Title>Education</Card.Title>
        <Card.Text><h5>{educationDetails.collegeName}</h5></Card.Text>
        <Card.Text>{educationDetails.degree}, {educationDetails.collegeLocation}, CGPA : {educationDetails.currentCgpa}</Card.Text>
      </Card.Body>
    </Card>
  )
}