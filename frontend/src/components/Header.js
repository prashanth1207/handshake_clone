import React from 'react';
import PreLoginHandShakeLogoSvg from './svg/PreLoginHandShakeLogoSvg';
import '../css/registration.css';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';

const Header = ({ loggedIn }) => {
  if (loggedIn) {
    return <NavigationBar />;
  }
  return (
    <div className="prelogin-header">
      <Link to="/">
        <PreLoginHandShakeLogoSvg />
      </Link>
    </div>
  );
};

export default Header;
