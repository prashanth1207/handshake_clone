import React, { useState } from 'react';
import WorkExperienceShow from './WorkExperienceShow'
import WorkExperienceEdit from './WorkExperienceEdit'

export default function WorkExperience(props){
  let [stateObj,setstateObj] = useState({state: 'show',studentProfile: props.studentProfile});
  if(stateObj.state === 'show'){
    return <WorkExperienceShow studentProfile={stateObj.studentProfile} setstateObj={setstateObj}/>
  }else{
    return <WorkExperienceEdit studentProfile={stateObj.studentProfile} setstateObj={setstateObj}/>
  }
}