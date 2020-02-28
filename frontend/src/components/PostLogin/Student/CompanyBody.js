import React from 'react';
import CompanyBasicInfo from './CompanyBasicInfo';
import CompanyDescription from './CompanyDescription';
import CompanyContactInformation from './CompanyContactInformation';
import './companyprofile.css'
import axios from 'axios'

export default function CompanyBody(props){
  let companyProfileResp = props.companyProfileResp;

  if(companyProfileResp.status === 'loading'){
    return <h3>Loading Profile...</h3>
  }else if(companyProfileResp.status === 'recordNotFound'){
    return <h3>Profile Not Found</h3>
  }

  return(
    <div class="clearfix new-topbar-nux">
      <div data-hook="container" class="style__container___15r1p style__large___3HKaH style__fitted___2ndoo">
        <CompanyBasicInfo companyProfile={companyProfileResp.companyProfile}/>
        <div data-hook="row" class="style__row___273Yw">
          <CompanyDescription companyProfile={companyProfileResp.companyProfile}/>
          <CompanyContactInformation companyProfile={companyProfileResp.companyProfile}/>
        </div>
      </div>
    </div>  
  )
}