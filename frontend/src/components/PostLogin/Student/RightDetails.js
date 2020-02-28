import React from 'react';
import CareerObjective from './CareerObjective'
import EducationDetails from './EducationDetails' 
import WorkExperience from './WorkExperience' 

export default function RightDetails(props){
  return(
    <div>
      <CareerObjective studentProfile={props.studentProfile}/>
      <EducationDetails educationDetails={props.studentProfile.educationDetails[0] || {}}/>
      <WorkExperience experienceDetails={props.studentProfile.experienceDetails[0] || {}}/>
    </div>
  )
}