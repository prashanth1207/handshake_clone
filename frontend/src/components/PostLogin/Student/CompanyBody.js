import React from 'react';
import CompanyBasicInfo from './CompanyBasicInfo';
import CompanyDescription from './CompanyDescription';
import CompanyContactInformation from './CompanyContactInformation';
import axios from 'axios'
import { Container,Row,Col } from 'react-bootstrap';

export default function CompanyBody(props){
  let companyProfileResp = props.companyProfileResp;

  if(companyProfileResp.status === 'loading'){
    return <h3>Loading Profile...</h3>
  }else if(companyProfileResp.status === 'recordNotFound'){
    return <h3>Profile Not Found</h3>
  }

  return(
    <div>
      <Row className='my-3'>
        <Col>
          <CompanyBasicInfo companyProfile={companyProfileResp.companyProfile}/>
        </Col>
      </Row>
      <Row className='my-3'>
        <Col xs={9}>
          <CompanyDescription companyProfile={companyProfileResp.companyProfile}/>
        </Col>
        <Col>
          <CompanyContactInformation companyProfile={companyProfileResp.companyProfile}/>
        </Col>
      </Row>
    </div>
  )
}