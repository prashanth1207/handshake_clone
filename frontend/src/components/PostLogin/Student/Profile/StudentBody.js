import React, { useEffect, useState } from 'react';
import './studentbody.css';
import axios from 'axios';
import {
  Row, Col,
} from 'react-bootstrap';
import LeftDetails from './LeftDetails';
import { rooturl } from '../../../../config/config';
import RightDetails from './RightDetails';
import {connect} from 'react-redux';
import { getStudentProfile } from './../../../../redux/studentProfile/studentProfileActions';

function StudentBody(props) {
  const studentProfileResp = props.studentProfileResp;
  useEffect(() => {
    if (studentProfileResp.status === 'loading') {
      props.getStudentProfile(props.studentProfileId);
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

const mapStateToProps = (state) =>({
  studentProfileResp: state.studentProfile.studentProfile,
})

export default connect(mapStateToProps,{getStudentProfile})(StudentBody);