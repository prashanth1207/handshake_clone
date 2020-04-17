import React from 'react';
import EducationDetail from './EducationDetail';
import EducationDetailNew from './EducationDetailNew';
import { Card } from 'react-bootstrap';
import {connect} from 'react-redux';

function EducationDetails(props) {
  const {educationDetails} = props.studentProfile;
  let educationDetailsTag =  educationDetails.map(educationDetail =>{
    return <EducationDetail educationDetail={educationDetail}/>
  });
  educationDetailsTag.push(<hr />)
  educationDetailsTag.push(<EducationDetailNew studentProfileId={props.studentProfile._id}/>)
  return <Card>
    <Card.Body>
      <Card.Title>Education</Card.Title>
        {educationDetailsTag}
      </Card.Body>
    </Card>
}

const mapStateToProps = (state) =>({
  studentProfile: state.studentProfile.studentProfile.studentProfile,
})

export default connect(mapStateToProps)(EducationDetails);