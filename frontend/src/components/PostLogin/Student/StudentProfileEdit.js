import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { rooturl } from '../../../config/config';
import StudentBodyEdit from './StudentBodyEdit';

export default function StudentProfileEdit() {
  const { studentProfileId } = useParams();
  const [studentProfileResp, setData] = useState({ status: 'loading', studentProfile: null });
  useEffect(() => {
    if (studentProfileResp.status === 'loading') {
      axios.get(`${rooturl}/student_profile/${studentProfileId}`, {
        validateStatus: false,
      }).then((resp) => {
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
    <StudentBodyEdit studentProfileResp={studentProfileResp} />
  );
}
