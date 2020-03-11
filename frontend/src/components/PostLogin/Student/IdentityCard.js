import React,{useState} from 'react';
import IdentityCardShow from './IdentityCardShow';
import IdentityCardEdit from './IdentityCardEdit';

export default function IdentityCard(props){
  let [stateObj,setstateObj] = useState({state: 'show',studentProfile: props.studentProfile});
  let studentProfile = stateObj.studentProfile

  if (stateObj.state === 'show'){
    return <IdentityCardShow studentProfile={studentProfile} setstateObj={setstateObj}/>
  }
  else{
    return <IdentityCardEdit studentProfile={studentProfile} setstateObj={setstateObj}/>;
  }
}