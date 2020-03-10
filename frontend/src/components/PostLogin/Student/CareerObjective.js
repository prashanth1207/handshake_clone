import React from 'react';
import EditProfileSvg from './../../EditProfileSvg'
import {Card, Button} from 'react-bootstrap'

export default function CareerObjective(props){
  return(
    <Card>
      <Card.Body>
        <div>
          <Button variant='link' style={{float: 'right', width:'10px'}}>
            <EditProfileSvg/>
          </Button>
        </div>
        <Card.Title>My Journey</Card.Title>
        <Card.Text>{props.studentProfile.careerObjective}</Card.Text>
      </Card.Body>
    </Card>
  )
}