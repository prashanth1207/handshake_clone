import React from 'react';
import EditProfileSvg from './../../EditProfileSvg'
import {Card, Button} from 'react-bootstrap'

function EducationDetailsShow(props) {
  let educationDetails = props.studentProfile.educationDetails[0] || {};

  return(
    <Card>
      <Card.Body>
        <div>
        <Button variant='link' onClick={e => props.setstateObj({state: 'edit', studentProfile: props.studentProfile})} style={{float: 'right', width:'10px'}}>
            <EditProfileSvg/>
          </Button>
        </div>
        <Card.Title>Education</Card.Title>
        <Card.Subtitle>{educationDetails.collegeName}</Card.Subtitle>
        <Card.Text>
          <div>
            <div>
            {educationDetails.degree}, <b>Major in </b>{educationDetails.major}
            </div>
            <div>
              {educationDetails.collegeLocation}, CGPA : {educationDetails.currentCgpa}
            </div>
          </div>
        </Card.Text>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  )
}

export default EducationDetailsShow;