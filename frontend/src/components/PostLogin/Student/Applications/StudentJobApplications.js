import React, { useState } from 'react';
import axios from 'axios';
import {
  Card, Row, Col, Form,
} from 'react-bootstrap';
import { storedUserInfo } from '../../../../utility';
import { rooturl } from '../../../../config/config';
import MyPagination from '../../Common/MyPagination';


function StudentJobApplications() {
  let perPage = 1;
  const [applicationResp, setapplicationResp] = useState({ 
    status: 'loading', 
    applications: null, 
    queryParams: {
      page: 1,
      perPage: perPage,
      status: ''
    }, 
    totalPages: null
  });
  if (applicationResp.status === 'loading') {
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
axios.get(`${rooturl}/job_application/student_applications/${storedUserInfo().profile._id}`, { params: applicationResp.queryParams }, { validateStatus: false })
      .then((resp) => {
        if (resp.status === 200 && resp.data.data) {
          return setapplicationResp({ 
            status: 'loaded', 
            applications: resp.data.data, 
            queryParams: applicationResp.queryParams,
            totalPages: Math.ceil(resp.data.totalRecords / perPage)
          });
        }
        return setapplicationResp({ status: 'error', applications: null, queryParams: applicationResp.queryParams });
      });
  }

  const handleOnChange = (e) => {
    const status = e.currentTarget.value;
    setapplicationResp({ 
      status: 'loading', 
      applications: null, 
      queryParams: {
        status: status , 
        page : applicationResp.queryParams.page
      },
      currentPage: 1, 
      totalPages: null
    });
  };
  const handlePrevPage = () =>{
    if(applicationResp.currentPage === 1){
      return
    }
    setapplicationResp({ 
      status: 'loading', 
      applications: null, 
      queryParams: {
        ...applicationResp.queryParams,
        page: applicationResp.queryParams.page - 1
      },
      totalPages: null
    });
  }

  const handleNextPage = () =>{
    if(applicationResp.currentPage === applicationResp.totalPages){
      return
    }
    setapplicationResp({ 
      status: 'loading', 
      applications: null, 
      queryParams: {
        ...applicationResp.queryParams,
        page: applicationResp.queryParams.page + 1
      },
      totalPages: null
    });
  }

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
            <Card.Title><a href={`/job_postings/${application.jobPosting._id}`}>{application.jobPosting.jobTitle}</a></Card.Title>
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
        <MyPagination handlePrevPage={handlePrevPage} currentPage={applicationResp.queryParams.page} totalPages={applicationResp.totalPages} handleNextPage={handleNextPage}/>
      </Col>
    </Row>
  );
}

export default StudentJobApplications;
