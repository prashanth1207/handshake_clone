import React from 'react';
import {Link} from 'react-router-dom';

function SignUp(){
  return(
    <div>
      <div>
        <Link to='/company_signup'>Company</Link>
      </div>
      <div>
        <Link to='/student_signup'>Student</Link>
      </div>
    </div>
  );
}

export default SignUp;