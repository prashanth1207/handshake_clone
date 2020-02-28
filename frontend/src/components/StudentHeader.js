import React from 'react';
import {connect} from 'react-redux';
import {LogOut} from '../redux/actions/index'
import './postLoginNavbar.css';
import PostLoginHandshakeLogo from './PostLoginHandshakeLogo'

let StudentHeader = (props) => {
  let handleLogout = () =>{
    sessionStorage.removeItem('userInfo');
    props.logout();
  } 
  return(
    <nav class="" data-hook="student-topbar">
      <div class="style__topbar___1g_T-">
          <div data-hook="container" class="style__container___15r1p style__large___3HKaH style__fitted___2ndoo">
              <div class="style__content___52wSy">
                  <PostLoginHandshakeLogo />
                  <div class="style__logo-container___9x_d2">
                    </div><a href="/postings" class="style__nav-link___3OIDg style__nav-link___2tzH7"><span data-hook="student-topbar-jobs-link"><span>Jobs</span></span></a><a href="/events" class="style__nav-link___3OIDg style__nav-link___2tzH7"><span><span>Events</span></span></a>
                  <a href="/students" class="style__nav-link___3OIDg style__nav-link___2tzH7"><span><span>Students</span></span></a>
                  <a href="/student/student_profile/2" class="style__nav-link___3OIDg style__nav-link___2tzH7"><span><span>My Profile</span></span></a>
                  <a href="#" class="style__nav-link___3OIDg style__nav-link___2tzH7" onClick={handleLogout}><span><span>Logout</span></span></a>
              </div>
          </div>
      </div>
    </nav>
  )
}

let mapDispatchToProps = {
  logout: LogOut
}
let ConnectedStudentHeader = connect(null,mapDispatchToProps)(StudentHeader)
export default ConnectedStudentHeader