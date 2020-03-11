import React,{useState} from 'react';
import SkillSetShow from './SkillSetShow';
import SkillSetEdit from './SkillSetEdit';

export default function SkillSet(props){
  let [stateObj,setstateObj] = useState({state: 'edit',studentProfile: props.studentProfile});
  let studentProfile = stateObj.studentProfile

  if (stateObj.state === 'show'){
    return <SkillSetShow studentProfile={studentProfile} setstateObj={setstateObj}/>
  }
  else{
    return <SkillSetEdit studentProfile={studentProfile} setstateObj={setstateObj}/>;
  }
}