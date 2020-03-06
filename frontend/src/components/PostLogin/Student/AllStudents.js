import React,{useState} from 'react';
import {Container, Row, Col, Image,Card} from 'react-bootstrap';
import axios from 'axios';
import IdentityCard from './IdentityCard';

function AllStudents(props) {
  let [studentsResp,setstudentsResp] = useState({status: 'loading', students: null});

  if(studentsResp.status === 'loading'){
    axios.get('http://localhost:3001/student_profile',{validateStatus: false}).then(resp => {
      if(resp.status == 200 && resp.data.data){
        setstudentsResp({status: 'loaded',students: resp.data.data});
      }else{
        setstudentsResp({status: 'error',students: null});
      }
    })
  }

  if(studentsResp.status === 'loading'){
    return <div> Loading Profiles..</div>
  }
  if(studentsResp.status === 'error'){
    return <div>Something went wrong</div>
  }
  let students_tag = studentsResp.students.map(student => {
    let educationDetails = student.educationDetails[0] || {}
    let image_path = `http://localhost:3001/images/profile_pics/${student.userId}.png`
    let profile_path = `/student_profile/${student.id}`
    return <Row className='my-3'>
      <Col>
        <Card>
          <Card.Body>
            <Row>
              <Col xs={3} style={{'max-width':'100px','max-height':'100px'}}><a href={profile_path}><Image variant="center" src={image_path} roundedCircle thumbnail fluid/></a></Col>
              <Col>
                <Row>
                  <Col>
                    <h3><a href={profile_path}>{student.firstName} {student.lastName}</a></h3>
                    <div>{student.currentCollegeName}</div>
                    <div>{educationDetails.degree}, {educationDetails.major}</div>
                    <div>Year of Passing {educationDetails.yearOfPassing}</div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  })
  return (
    <Container>
      {students_tag}
    </Container>
  );
}

export default AllStudents;