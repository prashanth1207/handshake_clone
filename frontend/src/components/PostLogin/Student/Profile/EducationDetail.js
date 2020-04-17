import React, { useState } from 'react';
import EducationDetailsShow from './EducationDetailsShow';
import EducationDetailsEdit from './EducationDetailsEdit';
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux';

function EducationDetail(props) {
  if(props.educationDetail.status === 'edit'){
    return <EducationDetailsEdit educationDetail={props.educationDetail}/>;
  }
  if(props.educationDetail.status === 'deleted'){
    return null;
  }
  else {
    return <EducationDetailsShow educationDetail={props.educationDetail} />;
  }
}
const mapStateToProps = (state,ownProps) =>{
  let educationDetails = state.studentProfile.studentProfile.studentProfile.educationDetails;
  let educationDetail = educationDetails.find(educationDetail =>{
    if(educationDetail._id === ownProps.educationDetail._id){
      return true;
    }
  })
  return ({
    educationDetail: educationDetail,
    status: educationDetail.status
  })
}
export default connect(mapStateToProps)(EducationDetail);
