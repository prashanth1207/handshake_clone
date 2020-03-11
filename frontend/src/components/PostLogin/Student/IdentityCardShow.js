import React from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import EditProfileSvg from '../../EditProfileSvg';
import { storedUserInfo } from '../../../utility';

function IdentityCardShow(props) {
  const { studentProfile } = props;
  const educationDetails = studentProfile.educationDetails[0] || {};
  const image_path = `http://localhost:3001/images/profile_pics/${studentProfile.userId}.png`;
  let editButton = null;
  if (studentProfile.id === storedUserInfo().profile.id) {
    editButton = (
      <Button variant="link" onClick={(e) => props.setstateObj({ state: 'edit', studentProfile })} style={{ float: 'right', width: '10px' }}>
        <EditProfileSvg />
      </Button>
    );
  }
  return (
    <Card className="text-center" fluid>
      <Card.Body>
        <div>
          {editButton}
        </div>
        <Image style={{ 'max-width': '200px', 'max-height': '200px' }} variant="center" src={image_path} roundedCircle thumbnail fluid />
        <Card.Title>
          {studentProfile.firstName}
          {' '}
          {studentProfile.lastName}
        </Card.Title>
        <Card.Text>{studentProfile.currentCollegeName}</Card.Text>
        <Card.Text>
          {educationDetails.degree}
          ,
          {' '}
          {educationDetails.major}
        </Card.Text>
        <Card.Text>
          Year of Passing
          {educationDetails.yearOfPassing}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default IdentityCardShow;
