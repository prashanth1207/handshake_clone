import React, { useEffect, useState } from 'react'
import './studentbody.css';
import LeftDetails from './LeftDetails'
import RightDetails from './RightDetails'
import axios from 'axios'
import {Container,Row,Col, Card} from 'react-bootstrap'

export default function StudentBody(props){
  let [studentProfileResp,setData] = useState({status: 'loading', studentProfile: null});
  useEffect(() =>{
    if(studentProfileResp.status === 'loading'){
      axios.get(`http://localhost:3001/student_profile/${props.studentProfileId}`, { 
        validateStatus: false 
      }).then((resp)=>{
        console.log(resp.status);
        if(resp.status === 200){
          setData({status: 'recordFound',studentProfile: resp.data});
        }else{
          setData({status: 'recordNotFound'});
        }
      })
    }
  });

  if(studentProfileResp.status === 'loading'){
    return <h3>Loading Profile...</h3>
  }else if(studentProfileResp.status === 'recordNotFound'){
    return <h3>Profile Not Found</h3>
  }

  return(
      <Row>
        <Col xs={4}>
          <LeftDetails studentProfile={studentProfileResp.studentProfile} />
        </Col>
        <Col xs={8}>
        <RightDetails studentProfile={studentProfileResp.studentProfile} />
        </Col>
      </Row>
  );
}