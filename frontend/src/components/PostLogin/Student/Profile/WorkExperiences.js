import React, { useState } from 'react';
import WorkExperience from './WorkExperience';
import WorkExperienceNew from './WorkExperienceNew';
import { Card } from 'react-bootstrap';
import {connect} from 'react-redux';

function WorkExperiences(props) {
  const {experienceDetails} = props;
  let experienceDetailsTag =  experienceDetails.map(experienceDetail =>{
    return <WorkExperience experienceDetail={experienceDetail}/>
  });
  experienceDetailsTag.push(<hr />)
  experienceDetailsTag.push(<WorkExperienceNew studentProfileId={props.studentProfile._id}/>)
  return <Card>
    <Card.Body>
      <Card.Title>Work Experience</Card.Title>
        {experienceDetailsTag}
      </Card.Body>
    </Card>
}

const mapStateToProps = (state) =>({
  experienceDetails: state.studentProfile.studentProfile.studentProfile.experienceDetails,
})

export default connect(mapStateToProps)(WorkExperiences);