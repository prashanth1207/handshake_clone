import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { rooturl } from '../../../../config/config';
import CompanyBody from './CompanyBody';
import {CompanyProfileQuery} from '../../../../graphql/queries/company'
import {useQuery} from 'react-apollo'

export default function CompanyProfile() {
  const { id } = useParams();
  const {loading, error, data} = useQuery(CompanyProfileQuery,{variables: {id: id}});
  if (loading) {
    return <h3>Loading Profile...</h3>;
  } if (!loading && !data) {
    return <h3>Profile Not Found</h3>;
  }
  return (
    <div>
      <CompanyBody companyProfile={data.companyProfile} />
    </div>
  );
}
