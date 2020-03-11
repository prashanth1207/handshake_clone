import React from 'react';
import {
  Card, Row, Col, Image, Badge,
} from 'react-bootstrap';
import LocationSvg from '../../LocationSvg';
import CategorySvg from '../../CategorySvg';
import SalarySvg from '../../SalarySvg';

function JobPostingSummary(props) {
  const { jobPosting } = props;
  const jobCategory = (jobPosting.jobCategory || '').split(',');
  const jobCategoryTag = jobCategory.map((jobCategory) => (
    <span>
      <Badge variant="secondary">{jobCategory}</Badge>
&nbsp;
    </span>
  )) || null;
  let job_title = jobPosting.jobTitle;
  const profile_path = `/company_profile/${jobPosting.companyProfile.id}`;
  const image_path = `http://localhost:3001/images/profile_pics/${jobPosting.companyProfile.userId}.png`;
  if (props.linkJobTitle) {
    job_title = <a href={`/job_postings/${jobPosting.id}`}>{job_title}</a>;
  }
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={3} style={{ 'max-width': '100px', 'max-height': '100px' }}><a href={profile_path}><Image variant="center" src={image_path} roundedCircle thumbnail fluid /></a></Col>
          <Col>
            <Row>
              <Col>
                <h3>{job_title}</h3>
                <div><a href={profile_path}>{jobPosting.companyProfile.name}</a></div>
                <div>
                  <LocationSvg />
                  {' '}
                  {jobPosting.location || 'Not provided'}
                </div>
                <Row>
                  <Col>
                    <div>
                      <CategorySvg />
                      {' '}
                      {jobCategoryTag || 'Not provided'}
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <SalarySvg />
                      {' '}
                      {jobPosting.salary || 'Not provided'}
                    </div>
                  </Col>
                </Row>
                <Row>
                  {props.jobApplications}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default JobPostingSummary;
