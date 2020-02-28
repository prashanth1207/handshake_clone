import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PreLoginHeader from './components/Prelogin/PreLoginHeader'
import Home from './components/Prelogin/Home'
import SignIn from './components/Prelogin/SignIn'
import SignUp from './components/Prelogin/SignUp'
import StudentSignUp from './components/Prelogin/StudentSignUp'
import CompanySignUp from './components/Prelogin/CompanySignUp'
import StudentHeader from './components/PostLogin/Student/StudentHeader'
import StudentProfile from './components/PostLogin/Student/StudentProfile'
import CompanyProfile from './components/PostLogin/Student/CompanyProfile'
import CompanyProfileEdit from './components/PostLogin/Student/CompanyProfileEdit'
import StudentProfileEdit from './components/PostLogin/Student/StudentProfileEdit'
import StudentJobPostingShow from './components/PostLogin/Student/StudentJobPostingShow'
import RedirectToHome from './components/RedirectToHome';


function App() {
  let header = sessionStorage.getItem('userInfo') ? <StudentHeader /> : <PreLoginHeader />
    return (
      <Router>
        <div className="App">
          {header}
          <RedirectToHome />
          {/* SignUp and Registrations */}
          <Route exact path='/' component={Home} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/student_signup' component={StudentSignUp} />
          <Route exact path='/company_signup' component={CompanySignUp} />

          {/* Student and company profiles */}
          <Route exact path='/student/student_profile/:id' component={StudentProfile} />
          <Route exact path='/student/company_profile/:id' component={CompanyProfile} />
          <Route exact path='/company/company_profile/:id' component={CompanyProfile} />
          <Route exact path='/student/student_profile/:id/edit' component={StudentProfileEdit} />
          <Route exact path='/company/company_profile/:id/edit' component={CompanyProfileEdit} />

          {/* Job postings */}
          <Route exect path='/student/student_profile/job_postings/:id' component={StudentJobPostingShow} />
        </div>
      </Router>
    );
}

export default App;
