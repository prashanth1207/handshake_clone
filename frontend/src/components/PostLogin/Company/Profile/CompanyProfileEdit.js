import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CompanyBodyEdit from './CompanyBodyEdit';
import { rooturl } from '../../../../config/config';
import { getCompanyProfile } from './../../../../redux/companyProfile/companyProfileActions';
import { connect } from 'react-redux';


function CompanyProfileEdit(props) {
  const { companyProfileId } = useParams();
  const companyProfileResp = props.companyProfileResp;
  if (companyProfileResp.status === 'loading') {
    props.getCompanyProfile(companyProfileId);
  }
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

const mapStateToProps = (state) => ({
  companyProfileResp: state.companyProfile.getProfile
})


export default connect(mapStateToProps,{getCompanyProfile})(CompanyProfileEdit);
