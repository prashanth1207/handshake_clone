import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Prelogin/Home'
import SignIn from './components/Prelogin/SignIn'
import SignUp from './components/Prelogin/SignUp'
import StudentSignUp from './components/Prelogin/StudentSignUp'
import CompanySignUp from './components/Prelogin/CompanySignUp'
import Header from './components/Header'
import StudentProfile from './components/PostLogin/Student/StudentProfile'
import CompanyProfile from './components/PostLogin/Student/CompanyProfile'
import CompanyProfileEdit from './components/PostLogin/Student/CompanyProfileEdit'
import StudentProfileEdit from './components/PostLogin/Student/StudentProfileEdit'
import JobPostingShow from './components/PostLogin/Student/JobPostingShow'
import JobPostingCreate from './components/PostLogin/Student/JobPostingCreate';
import JobPostingsAll from './components/PostLogin/Student/JobPostingsAll';


function App() {
    return (
      <Router>
        <div className="App">
          <Header />
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
          <Route exect path='/student/job_postings/:id' component={JobPostingShow} />
          <Route exect path='/student/job_postings' component={JobPostingsAll} />
          <Route exect path='/company/:companyProfileId/job_postings/:id/' component={JobPostingCreate} />
        </div>
      </Router>
    );
}

export default App;
