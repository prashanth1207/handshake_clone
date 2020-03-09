import React from 'react';
import {Card} from 'react-bootstrap'

export default function EducationDetails(props){
  let educationDetails = props.educationDetails
  return(
    <Card>
      <Card.Body>
        <Card.Title>Education</Card.Title>
        <Card.Text><h5>{educationDetails.collegeName}</h5></Card.Text>
        <Card.Text>{educationDetails.degree}, {educationDetails.collegeLocation}, CGPA : {educationDetails.currentCgpa}</Card.Text>
      </Card.Body>
    </Card>
  )
}