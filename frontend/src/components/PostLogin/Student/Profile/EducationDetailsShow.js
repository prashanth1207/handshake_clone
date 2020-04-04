import React from 'react';
import { Card, Button } from 'react-bootstrap';
import EditProfileSvg from '../../../svg/EditProfileSvg';
import { storedUserInfo } from '../../../../utility';

function EducationDetailsShow(props) {
  const educationDetails = (props.studentProfile.educationDetails || [])[0] || {};
  let editButton = null;
  if (props.studentProfile._id === storedUserInfo().profile._id) {
    editButton = (
      <Button variant="link" onClick={(e) => props.setstateObj({ state: 'edit', studentProfile: props.studentProfile })} style={{ float: 'right', width: '10px' }}>
        <EditProfileSvg />
      </Button>
    );
  }

  return (
    <Card>
      <Card.Body>
        <div>
          {editButton}
        </div>
        <Card.Title>Education</Card.Title>
        <Card.Subtitle>{educationDetails.collegeName}</Card.Subtitle>
        <Card.Text>
          <div>
            <div>
              {educationDetails.degree}
              ,
              <b>Major in </b>
              {educationDetails.major}
            </div>
            <div>
              {educationDetails.collegeLocation}
              , CGPA :
              {educationDetails.currentCgpa}
            </div>
          </div>
        </Card.Text>
        <Card.Text />
      </Card.Body>
    </Card>
  );
}

export default EducationDetailsShow;
