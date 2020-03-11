import React, { useState } from 'react';
import {Card,Badge, Button, Form, Row, Col, Alert} from 'react-bootstrap'
import SkillRemoveSvg from './../../skillRemoveSvg'
import {studentProfileSubmit} from './../../../utility'

function SkillSetEdit(props) {
  let [skillSet, setSkillSet] = useState((props.studentProfile.skillSet || '').split(','))
  let [errorMsg,seterrorMsg] = useState(null);
  
  let handleAddSkill = (e) => {
    e.preventDefault();
    let newSkill = e.currentTarget.newSkill.value.trim();
    let present = skillSet.some(skill => {
      return skill.toLowerCase() === newSkill.toLowerCase()
    })
    if(present){
      return seterrorMsg(<Alert variant='danger'>Skill already added</Alert>)
    }
    e.currentTarget.reset();
    submitSkillSet(skillSet.concat(newSkill));
  }
  
  let handleRemoveSkill = (e) => {
    let removeSkill = e.currentTarget.id;
    submitSkillSet(skillSet.filter(skill =>{
      return skill != removeSkill
    }));
  }

  let submitSkillSet = async (skills) => {
    let formData = {
      studentProfile:{
        skillSet: skills.join(',')
      }
    }
    let resp = await studentProfileSubmit(formData,props.studentProfile.id);
    if(resp.status === 200 && resp.data.success){
      setSkillSet(skills)
    }else{
      seterrorMsg(<Alert variant='danger'>{resp.data.error}</Alert>)
    }
  }
  
  let skill_span_tags = skillSet.map(skill => {
    return(
      <Button id={skill} onClick={handleRemoveSkill} variant='Link' className='p-1'><Badge variant='secondary'>{skill}&nbsp;<SkillRemoveSvg/></Badge></Button>
    )
  });
  return (
    <Card my-3>
    <Card.Body>
      <Card.Title>Skills</Card.Title>
      <Form onSubmit={handleAddSkill}>
        <Card.Text>
          {skill_span_tags}
        </Card.Text>
        <Row>
          <Col xs={8} className="pr-1">
            <Form.Control required name='newSkill' placeholder='Add new Skills'/>
          </Col>
          <Col className="pl-1">
            <Button type='submit' variant='primary'>Add</Button>
          </Col>
          <Col>{errorMsg}</Col>
        </Row>
      </Form>
      </Card.Body>
  </Card>
  );
}

export default SkillSetEdit;