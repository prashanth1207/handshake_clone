import React from 'react';
import EditProfileSvg from './../../EditProfileSvg'
import {Card, Button} from 'react-bootstrap'

function CareerObjectiveShow(props) {
  return(
    <Card>
      <Card.Body>
        <div>
          <Button variant='link' onClick={e => props.setstateObj({state: 'edit', studentProfile: props.studentProfile})} style={{float: 'right', width:'10px'}}>
            <EditProfileSvg/>
          </Button>
        </div>
        <Card.Title>My Journey</Card.Title>
        <Card.Text>{props.studentProfile.careerObjective}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CareerObjectiveShow;