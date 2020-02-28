import React from 'react';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import SignIn from './SignIn';

function Home(){
  return(
    <div>
      <div>
        <Link to='/signin'>Sign In</Link>
      </div>
      <div>
        <Link to='/signup'>Sign Up</Link>
      </div>
    </div>
  );
}

export default Home;