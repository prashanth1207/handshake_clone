import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { rooturl } from '../../../config/config';
import CompanyBody from './CompanyBody';

export default function CompanyProfile() {
  const { id } = useParams();
  const [companyProfileResp, setData] = useState({ status: 'loading', companyProfile: {} });
  useEffect(() => {
    if (companyProfileResp.status === 'loading') {
      axios.get(`${rooturl}/company_profile/${id}`, {
        validateStatus: false,
      }).then((resp) => {
        if (resp.status === 200) {
          setData({ status: 'recordFound', companyProfile: resp.data });
        } else {
          setData({ status: 'recordNotFound' });
        }
      });
    }
  });
  if (companyProfileResp.status === 'loading') {
    return <h3>Loading Profile...</h3>;
  } if (companyProfileResp.status === 'recordNotFound') {
    return <h3>Profile Not Found</h3>;
  }
  return (
    <div>
      <CompanyBody companyProfileResp={companyProfileResp} />
    </div>
  );
}
