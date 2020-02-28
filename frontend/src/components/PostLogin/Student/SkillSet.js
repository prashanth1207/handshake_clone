import React from 'react';

export default function SkillSet(props){
  let skill_span_tags = (props.studentProfile.skillSet || '').split(',').map(skill => {
    return(
      <span class="style__tag___JUqHD" title={skill}><span class=" style__content___2INbm style__children___1bmK9">{skill}</span></span>
    )
  });
  return(
    <div class="style__card___1rhof" data-hook="skill-card">
      <div class="style__card-item___B1f7m style__large___Kv76x">
        <h2 class="style__heading___29i1Z style__large___15W-p style__fitted___3L0Tr" id="skills">Skills</h2>
      </div>
      <div class="style__card-item___B1f7m style__large___Kv76x">
        <div class="student-skills">
         {skill_span_tags}
        </div>
      </div>
    </div>
  )
}