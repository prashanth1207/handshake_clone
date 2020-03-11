import React, { useState } from 'react';
import EducationDetailsShow from './EducationDetailsShow'
import EducationDetailsEdit from './EducationDetailsEdit'

export default function EducationDetails(props){
  let [stateObj,setstateObj] = useState({state: 'show',studentProfile: props.studentProfile});
  if(stateObj.state === 'show'){
    return <EducationDetailsShow studentProfile={stateObj.studentProfile} setstateObj={setstateObj}/>
  }else{
    return <EducationDetailsEdit studentProfile={stateObj.studentProfile} setstateObj={setstateObj}/>
  }
}