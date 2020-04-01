import React, { useEffect, useState } from 'react';
import './studentbody.css';
import axios from 'axios';
import {
  Row, Col,
} from 'react-bootstrap';
import LeftDetails from './LeftDetails';
import { rooturl } from '../../../../config/config';
import RightDetails from './RightDetails';

export default function StudentBody(props) {
  const [studentProfileResp, setData] = useState({ status: 'loading', studentProfile: null });
  useEffect(() => {
    if (studentProfileResp.status === 'loading') {
      axios.get(`${rooturl}/student_profile/${props.studentProfileId}`, {
        validateStatus: false,
      }).then((resp) => {
        console.log(resp.status);
        if (resp.status === 200) {
          setData({ status: 'recordFound', studentProfile: resp.data });
        } else {
          setData({ status: 'recordNotFound' });
        }
      });
    }
  });

  if (studentProfileResp.status === 'loading') {
    return <h3>Loading Profile...</h3>;
  } if (studentProfileResp.status === 'recordNotFound') {
    return <h3>Profile Not Found</h3>;
  }

  return (
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
