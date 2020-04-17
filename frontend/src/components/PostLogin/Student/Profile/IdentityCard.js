import React, { useState } from 'react';
import IdentityCardShow from './IdentityCardShow';
import IdentityCardEdit from './IdentityCardEdit';

export default function IdentityCard(props) {
  const [stateObj, setstateObj] = useState({ state: 'show'});
  const { studentProfile } = stateObj;

  if (stateObj.state === 'show') {
    return <IdentityCardShow setstateObj={setstateObj} />;
  }

  return <IdentityCardEdit setstateObj={setstateObj} />;
}
