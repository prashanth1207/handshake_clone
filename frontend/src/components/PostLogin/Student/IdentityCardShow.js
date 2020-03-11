import React from 'react';
import {Card,Image,Button} from 'react-bootstrap';
import EditProfileSvg from './../../EditProfileSvg';

function IdentityCardShow(props) {
  let studentProfile = props.studentProfile
  let educationDetails = studentProfile.educationDetails[0] || {}
  let image_path = `http://localhost:3001/images/profile_pics/${studentProfile.userId}.png`;
  return (
    <Card className="text-center" fluid>
      <Card.Body>
        <div>
          <Button variant='link' onClick={e => props.setstateObj({state: 'edit', studentProfile: studentProfile})} style={{float: 'right', width:'10px'}}>
            <EditProfileSvg/>
          </Button>
        </div>
        <Image style={{'max-width':'200px','max-height':'200px'}} variant="center" src={image_path} roundedCircle thumbnail fluid/>
        <Card.Title>{studentProfile.firstName} {studentProfile.lastName}</Card.Title>
        <Card.Text>{studentProfile.currentCollegeName}</Card.Text>
        <Card.Text>{educationDetails.degree}, {educationDetails.major}</Card.Text>
        <Card.Text>Year of Passing {educationDetails.yearOfPassing}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default IdentityCardShow;