import React from 'react';
import { Card, Button } from 'react-bootstrap';
import EditProfileSvg from '../../../svg/EditProfileSvg';
import { storedUserInfo } from '../../../../utility';
import { educationDetailClickEdit } from './../../../../redux/studentProfile/studentProfileActions';
import {connect} from 'react-redux';

function EducationDetailsShow(props) {
  const educationDetail = props.educationDetail;
  let editButton = null;
  if (educationDetail.studentProfile === storedUserInfo().profile._id) {
    editButton = (
      <Button variant="link" onClick={(_e) => props.educationDetailClickEdit(props.educationDetail._id)} style={{ float: 'right', width: '10px' }}>
        <EditProfileSvg />
      </Button>
    );
  }

  return (
    <Card.Text>
      {editButton}
      <h5>{educationDetail.collegeName}</h5>
      <div>
        <div>
          {educationDetail.degree}
          ,
          <b>Major in </b>
          {educationDetail.major}
        </div>
        <div>
          {educationDetail.collegeLocation}
          , CGPA :
          {educationDetail.currentCgpa}
        </div>
      </div>
    </Card.Text>
  );
}

export default connect(null,{educationDetailClickEdit})(EducationDetailsShow);
