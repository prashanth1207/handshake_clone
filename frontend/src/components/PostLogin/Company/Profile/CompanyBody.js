import React from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import CompanyBasicInfo from './CompanyBasicInfo';
import CompanyDescription from './CompanyDescription';
import CompanyContactInformation from './CompanyContactInformation';

export default function CompanyBody(props) {
  return (
    <div>
      <Row className="my-3">
        <Col>
          <CompanyBasicInfo companyProfile={props.companyProfile} />
        </Col>
      </Row>
      <Row className="my-3">
        <Col xs={9}>
          <CompanyDescription companyProfile={props.companyProfile} />
        </Col>
        <Col>
          <CompanyContactInformation companyProfile={props.companyProfile} />
        </Col>
      </Row>
    </div>
  );
}
