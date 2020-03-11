import React from 'react';
import {connect} from 'react-redux';
import {LogOut} from '../redux/actions/index'
import './postLoginNavbar.css';
import PostLoginHandshakeLogo from './PostLoginHandshakeLogo'
import {Navbar,Nav,NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {storedUserInfo} from './../utility'

let StudentHeader = (props) => {
  let handleLogout = () =>{
    sessionStorage.removeItem('userInfo');
    props.logout();
  }
  let profileId = storedUserInfo().profile.id;
  let role = storedUserInfo().type;
  let jobsLink = role === 'Student' ? '/student/job_postings' : `/company/job_postings`;
  let eventsLink = `/${role}/show_all_events`;
  let profileLink = `/${role}_profile/${profileId}`;
  let applicationLink = role === 'Student' ? <Nav.Link href={`/student/${profileId}/applications`}>Applications</Nav.Link> : null
  return(
      <Navbar bg="white" variant="white">
        <Navbar.Brand href="#home"> <PostLoginHandshakeLogo /></Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href={jobsLink}>Jobs</Nav.Link>
            {applicationLink}
            <Nav.Link href={eventsLink}>Events</Nav.Link>
            <Nav.Link href="/student_profiles">Students</Nav.Link>
            <Nav.Link href={profileLink}>My Profile</Nav.Link>
            <Nav.Link href="#" onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  )
}

let mapDispatchToProps = {
  logout: LogOut
}
let ConnectedStudentHeader = connect(null,mapDispatchToProps)(StudentHeader)
export default ConnectedStudentHeader