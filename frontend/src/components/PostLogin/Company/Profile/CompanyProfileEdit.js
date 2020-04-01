import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CompanyBodyEdit from './CompanyBodyEdit';
import { rooturl } from '../../../../config/config';


export default function CompanyProfileEdit() {
  const { companyProfileId } = useParams();
  const [companyProfileResp, setData] = useState({ status: 'loading', companyProfile: {} });
  useEffect(() => {
    if (companyProfileResp.status === 'loading') {
      axios.get(`${rooturl}/company_profile/${companyProfileId}`, {
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
      <CompanyBodyEdit companyProfileResp={companyProfileResp} />
    </div>
  );
}
