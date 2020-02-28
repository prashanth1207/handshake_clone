import React from 'react';
import IdentityCard from './IdentityCard'
import SkillSet from './SkillSet'


export default function LeftDetails(props){
  return(
  <div>
    <div class="style__card___1rhof" data-hook="card">
      <div class="style__card-item___B1f7m style__large___Kv76x">
        <IdentityCard studentProfile={props.studentProfile}/>
      </div>
    </div>
    <div>
      <SkillSet studentProfile={props.studentProfile}/>
    </div>
  </div>
  )
}