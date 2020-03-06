import React from 'react';
import {Card} from 'react-bootstrap'

export default function CareerObjective(props){
  return(
    <Card>
      <Card.Body>
        <Card.Title>My Journey</Card.Title>
        <Card.Text>{props.studentProfile.careerObjective}</Card.Text>
      </Card.Body>
    </Card>
  )
}