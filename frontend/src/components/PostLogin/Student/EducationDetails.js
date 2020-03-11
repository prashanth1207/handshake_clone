import React, { useState } from 'react';
import EducationDetailsShow from './EducationDetailsShow';
import EducationDetailsEdit from './EducationDetailsEdit';

export default function EducationDetails(props) {
  const [stateObj, setstateObj] = useState({ state: 'show', studentProfile: props.studentProfile });
  if (stateObj.state === 'show') {
    return <EducationDetailsShow studentProfile={stateObj.studentProfile} setstateObj={setstateObj} />;
  }
  return <EducationDetailsEdit studentProfile={stateObj.studentProfile} setstateObj={setstateObj} />;
}
