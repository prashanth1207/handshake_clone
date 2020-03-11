import React, { useState } from 'react';
import CareerObjectiveShow from './CareerObjectiveShow'
import CareerObjectiveEdit from './CareerObjectiveEdit'

export default function CareerObjective(props){
  let [stateObj,setstateObj] = useState({state: 'show',studentProfile: props.studentProfile});
  let studentProfile = stateObj.studentProfile;
  if (stateObj.state === 'show'){
    return <CareerObjectiveShow studentProfile={studentProfile} setstateObj={setstateObj}/>
  }
  else{
    return <CareerObjectiveEdit studentProfile={studentProfile} setstateObj={setstateObj}/>;
  }
}