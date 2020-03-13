import React, { useState } from 'react';
import {
  Container, Row, Col, Image, Card, Form, Button,
} from 'react-bootstrap';
import axios from 'axios';
import { MAJORS, storedUserInfo } from '../../../utility';
import { rooturl } from '../../../config/config';


function AllStudents(props) {
  const [studentsResp, setstudentsResp] = useState({ status: 'loading', students: null });

  if (studentsResp.status === 'loading') {
    axios.get(`${rooturl}/student_profile`, { validateStatus: false }).then((resp) => {
      if (resp.status == 200 && resp.data.data) {
        const students = resp.data.data.filter((student) => student.id != storedUserInfo().profile.id);
        setstudentsResp({ status: 'loaded', students });
      } else {
        setstudentsResp({ status: 'error', students: null });
      }
    });
  }

  const handleOnChange = (e) => {
    const { form } = e.currentTarget;
    const queryData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      currentCollegeName: form.currentCollegeName.value,
      skillSet: form.skillSet.value,
      educationDetails: {
        major: form.major.value,
      },
    };
    console.dir(queryData);
    axios.get(`${rooturl}/student_profile`, { params: queryData }, { validateStatus: false }).then((resp) => {
      if (resp.status == 200 && resp.data.data) {
        const students = resp.data.data.filter((student) => student.id != storedUserInfo().profile.id);
        setstudentsResp({ status: 'loaded', students });
      } else {
        setstudentsResp({ status: 'error', students: null });
      }
    });
  };

  const resetForm = (e) => {
    e.currentTarget.form.reset();
    handleOnChange(e);
  };

  if (studentsResp.status === 'loading') {
    return <div> Loading Profiles..</div>;
  }
  if (studentsResp.status === 'error') {
    return <div>Something went wrong</div>;
  }
  const students_tag = studentsResp.students.map((student) => {
    const educationDetails = student.educationDetails[0] || {};
    const image_path = `${rooturl}/images/profile_pics/${student.userId}.png`;
    const profile_path = `/student_profile/${student.id}`;
    return (
      <Row className="my-3">
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={3} style={{ 'max-width': '100px', 'max-height': '100px' }}><a href={profile_path}><Image variant="center" src={image_path} roundedCircle thumbnail fluid /></a></Col>
                <Col>
                  <Row>
                    <Col>
                      <Card.Title>
                        <a href={profile_path}>
                          {student.firstName}
                          {' '}
                          {student.lastName}
                        </a>
                      </Card.Title>
                      <div>{student.currentCollegeName}</div>
                      <Row>
                        <Col>
                          {educationDetails.degree}
                          ,
                          {' '}
                          {educationDetails.major}
                        </Col>
                        <Col>
                          Year of Passing
                          {educationDetails.yearOfPassing}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  });
  const majorOptions = MAJORS.map((major) => <option key={major} value={major}>{major}</option>);
  return (
    <Container>
      <Row>
        <Col xs={3}>
          <Row className="my-3">
            <Col>
              <Card>
                <Form inline>
                  <Card.Body>
                    <Card.Title>
                      Filters
                      <Button style={{ float: 'right' }} onClick={resetForm} variant="secondary">Reset</Button>
                    </Card.Title>
                  </Card.Body>
                  <Card.Body class="list-group-item">
                    <Card.Text>Name</Card.Text>
                    <Card.Text>
                      <Form.Control type="text" name="firstName" onChange={handleOnChange} placeholder="First Name" className="mr-sm-2" />
                    </Card.Text>
                    <Card.Text>
                      <Form.Control type="text" name="lastName" onChange={handleOnChange} placeholder="Last Name" className="mr-sm-2" />
                    </Card.Text>
                  </Card.Body>
                  <Card.Body class="list-group-item">
                    <Card.Text>College Name</Card.Text>
                    <Card.Text>
                      <Form.Control type="text" name="currentCollegeName" onChange={handleOnChange} placeholder="College Name" className="mr-sm-2" />
                    </Card.Text>
                  </Card.Body>
                  <Card.Body class="list-group-item">
                    <Card.Text>Skill Set</Card.Text>
                    <Card.Text>
                      <Form.Control type="text" name="skillSet" onChange={handleOnChange} placeholder="Skill Set" className="mr-sm-2" />
                    </Card.Text>
                  </Card.Body>
                  <Card.Body class="list-group-item">
                    <Card.Text>Major</Card.Text>
                    <Card.Text>
                      <Form.Control as="select" name="major" placeholder="selectMajor" onChange={handleOnChange} className="mr-sm-2" style={{ width: '100%' }}>
                        <option key="" value="">All</option>
                        {majorOptions}
                      </Form.Control>
                    </Card.Text>
                  </Card.Body>
                </Form>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col>
          {students_tag}
        </Col>
      </Row>
    </Container>
  );
}

export default AllStudents;
