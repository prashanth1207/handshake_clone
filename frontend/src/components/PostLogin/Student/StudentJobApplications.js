import React, { useState } from 'react';
import Axios from 'axios';
import {
  Card, Row, Col, Form,
} from 'react-bootstrap';
import { storedUserInfo } from '../../../utility';

function StudentJobApplications() {
  const [applicationResp, setapplicationResp] = useState({ status: 'loading', applications: null, queryParams: {} });
  if (applicationResp.status === 'loading') {
    Axios.get(`http://localhost:3001/job_application/student_applications/${storedUserInfo().profile.id}`, { params: applicationResp.queryParams }, { validateStatus: false })
      .then((resp) => {
        if (resp.status === 200 && resp.data.data) {
          return setapplicationResp({ status: 'loaded', applications: resp.data.data, queryParams: applicationResp.queryParams });
        }
        return setapplicationResp({ status: 'error', applications: null, queryParams: applicationResp.queryParams });
      });
  }

  const handleOnChange = (e) => {
    const status = e.currentTarget.value;
    setapplicationResp({ status: 'loading', applications: null, queryParams: { status } });
  };

  if (applicationResp.status === 'loading') {
    return <h3>Loading Applications..</h3>;
  }
  if (applicationResp.status === 'error') {
    return <h3>Something went wrong!</h3>;
  }
  const application_tag = applicationResp.applications.map((application) => (
    <Row className="my-3">
      <Col>
        <Card>
          <Card.Body>
            <Card.Title><a href={`/job_postings/${application.jobPosting.id}`}>{application.jobPosting.jobTitle}</a></Card.Title>
            <Card.Text>
              Status:
              {application.status}
            </Card.Text>
            <Card.Text>
              Applied:
              {new Date(application.createdAt).toLocaleString('en-US', { dateStyle: 'full' })}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  ));
  return (
    <Row>
      <Col xs={3}>
        <Row className="my-3">
          <Col>
            <Form>
              <Card.Body class="list-group-item">
                <Card.Text>Status</Card.Text>
                <Card.Text>
                  <Form.Control as="select" name="Status" placeholder="selectStatus" onChange={handleOnChange} className="mr-sm-2" style={{ width: '100%' }} defaultValue={(applicationResp.queryParams || {}).status}>
                    <option key="" value="">All</option>
                    <option key="Pending" value="Pending">Pending</option>
                    <option key="Reviewed" value="Reviewed">Reviewed</option>
                    <option key="Declined" value="Declined">Declined</option>
                  </Form.Control>
                </Card.Text>
              </Card.Body>
            </Form>
          </Col>
        </Row>
      </Col>
      <Col>
        {application_tag}
      </Col>
    </Row>
  );
}

export default StudentJobApplications;
