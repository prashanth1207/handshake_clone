import React from 'react';
import {
  Row, Col, Image, Card
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { rooturl } from '../../../config/config';
import { getStudentProfiles } from './../../../redux/studentProfiles/studentProfilesActions'
import MyPagination from './MyPagination';


function AllStudentsSearchResult(props) {
  let perPage = 10
  let studentProfiles = props.studentProfiles;
  
  if (props.status === 'loading') {
    return <h2> Loading Profiles...</h2>;
  }
  if (props.status === 'error') {
    return <h2>Something went wrong</h2>;
  }

  const handlePrevPage = (e) => {
    if(studentProfiles.currentPage === 1){
      return true;
    }
    props.getStudentProfiles({
      ...props.studentProfiles.queryParams,
      page: studentProfiles.currentPage - 1, 
      perPage: perPage
    });
  };
  const handleNextPage = (e) => {
    if(studentProfiles.currentPage === studentProfiles.totalPages){
      return true;
    }
    props.getStudentProfiles({
      ...studentProfiles.queryParams,
      page: studentProfiles.currentPage + 1, 
      perPage: perPage
    });
  };

  const students_tag = studentProfiles.students.map((student) => {
    const educationDetails = (student.educationDetails || [])[0] || {};
    const image_path = `${rooturl}/images/profile_pics/${student._id}.png`;
    const profile_path = `/student_profile/${student._id}`;
    return (
      <Row>
        <Col xs={3} style={{ 'max-width': '100px', 'max-height': '100px' }}><a href={profile_path}><Image variant="center" src={image_path} roundedCircle thumbnail fluid /></a></Col>
        <Col>
          <Row>
            <Col>
              <Card.Title>
                <a href={profile_path}>
                  {student.firstName}
                  {' '}
                  {student.lastName}
                </a>
              </Card.Title>
              <div>{student.currentCollegeName}</div>
              <Row>
                <Col>
                  {educationDetails.degree}
                  ,
                  {' '}
                  {educationDetails.major}
                </Col>
                <Col>
                  Year of Passing
                  {educationDetails.yearOfPassing}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
            
    );
  });
  let noDataTag = <h2>No results found</h2>
  if(!students_tag.length){
    return noDataTag
  }
  return (
    <div>
      {students_tag}
      <MyPagination handlePrevPage={handlePrevPage} currentPage={studentProfiles.currentPage} totalPages={studentProfiles.totalPages} handleNextPage={handleNextPage}/>
    </div>
  );
}

const mapStateToProps = (state) =>({
  studentProfiles: state.studentProfiles.studentProfilesData,
  status: state.studentProfiles.status
})
export default connect(mapStateToProps,{getStudentProfiles})(AllStudentsSearchResult);