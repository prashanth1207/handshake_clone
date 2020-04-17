import React from 'react';
import { Card, Button } from 'react-bootstrap';
import EditProfileSvg from '../../../svg/EditProfileSvg';
import { storedUserInfo } from '../../../../utility';
import { experienceDetailClickEdit } from './../../../../redux/studentProfile/studentProfileActions';
import {connect} from 'react-redux';

function WorkExperienceShow(props) {
  const experienceDetail = props.experienceDetail;
  let editButton = null;
  if (experienceDetail.studentProfile === storedUserInfo().profile._id) {
    editButton = (
      <Button variant="link" onClick={(_e) => props.experienceDetailClickEdit(props.experienceDetail._id)} style={{ float: 'right', width: '10px' }}>
        <EditProfileSvg />
      </Button>
    );
  }
  return (
    <Card.Text>
      {editButton}
      <h5>{experienceDetail.companyName}</h5>
      <div>{experienceDetail.title}</div>
      <div>
        {experienceDetail.readableStartDate}
        {' '}
        -
        {' '}
        {experienceDetail.readableEndDate}
      </div>
      <div>{experienceDetail.location}</div>
      <div>{experienceDetail.workDescription}</div>
    </Card.Text>
  );
}
export default connect(null,{experienceDetailClickEdit})(WorkExperienceShow);
