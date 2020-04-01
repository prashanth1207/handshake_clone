import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { LogOut } from '../redux/actions/index';
import PostLoginHandshakeLogo from './PostLoginHandshakeLogo';
import { storedUserInfo } from '../utility';

const NavigationBar = (props) => {
  const handleLogout = () => {
    sessionStorage.removeItem('userInfo');
    props.logout();
  };
  const profileId = storedUserInfo().profile._id;
  const role = storedUserInfo().type;
  const jobsLink = role === 'Student' ? '/student/job_postings' : '/company/job_postings';
  const eventsLink = `/${role}/show_all_events`;
  const profileLink = `/${role}_profile/${profileId}`;
  const applicationLink = role === 'Student' ? <Nav.Link href={`/student/${profileId}/applications`}>Applications</Nav.Link> : null;
  return (
    <Navbar bg="white" variant="white">
      <Navbar.Brand href="#home">
        {' '}
        <PostLoginHandshakeLogo />
      </Navbar.Brand>
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
  );
};

const mapDispatchToProps = {
  logout: LogOut,
};
const ConnectedNavigationBar = connect(null, mapDispatchToProps)(NavigationBar);
export default ConnectedNavigationBar;
