import React from 'react';
import {Card} from 'react-bootstrap'

export default function SkillSet(props){
  let skill_span_tags = (props.studentProfile.skillSet || '').split(',').map(skill => {
    return(
      <span class="style__tag___JUqHD" title={skill}><span class=" style__content___2INbm style__children___1bmK9">{skill}</span></span>
    )
  });
  return(
    <Card my-3>
      <Card.Body>
        <Card.Title>Skills</Card.Title>
          <Card.Text>
          <div class="student-skills">
          {skill_span_tags}
          </div>
          </Card.Text>
        </Card.Body>
    </Card>
  )
}