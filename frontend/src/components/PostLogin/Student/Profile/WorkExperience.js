import React, { useState } from 'react';
import WorkExperienceShow from './WorkExperienceShow';
import WorkExperienceEdit from './WorkExperienceEdit';
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux';

function WorkExperience(props) {
  if(props.status === 'edit'){
    return <WorkExperienceEdit experienceDetail={props.experienceDetail}/>;
  }
  if(props.status === 'deleted'){
    return null;
  }
  else {
    return <WorkExperienceShow experienceDetail={props.experienceDetail}/>;
  }
}

const mapStateToProps = (state,ownProps) =>{
  let experienceDetails = state.studentProfile.studentProfile.studentProfile.experienceDetails;
  let experienceDetail = experienceDetails.find(experienceDetail =>{
    if(experienceDetail._id === ownProps.experienceDetail._id){
      return true;
    }
  })
  return ({
    experienceDetail: experienceDetail,
    status: experienceDetail.status
  })
}
export default connect(mapStateToProps)(WorkExperience);
