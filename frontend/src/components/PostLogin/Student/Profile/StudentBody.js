import React, { useEffect, useState } from 'react';
import './studentbody.css';
import axios from 'axios';
import {
  Row, Col,
} from 'react-bootstrap';
import LeftDetails from './LeftDetails';
import { rooturl } from '../../../../config/config';
import RightDetails from './RightDetails';
import { StudentQuery } from '../../../../graphql/queries/student';
import { useQuery } from 'react-apollo';

export default function StudentBody(props) {
  const [studentProfileResp, setData] = useState({ status: 'loading', studentProfile: null });
  const { loading, error, data } = useQuery(StudentQuery, { variables: {
    id: props.studentProfileId
  }} );

  if (loading) {
    return <h3>Loading Profile...</h3>;
  } if (!loading && (!data || !data.studentProfile)) {
    return <h3>Profile Not Found</h3>;
  }
  console.log(data.studentProfile);
  return (
    <Row>
      <Col xs={4}>
        <LeftDetails studentProfile={data.studentProfile} />
      </Col>
      <Col xs={8}>
        <RightDetails studentProfile={data.studentProfile} />
      </Col>
    </Row>
  );
}
