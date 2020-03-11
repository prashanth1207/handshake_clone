import React from 'react';
import PreLoginHandShakeLogo from './PreLoginHandShakeLogo';
import '../css/registration.css';
import { Link } from 'react-router-dom';
import StudentHeader from './StudentHeader';

const Header = ({ loggedIn }) => {
  if (loggedIn) {
    return <StudentHeader />;
  }
  return (
    <div className="prelogin-header">
      <Link to="/">
        <PreLoginHandShakeLogo />
      </Link>
    </div>
  );
};

export default Header;
