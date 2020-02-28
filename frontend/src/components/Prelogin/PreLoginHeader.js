import React from 'react';
import HandShakeLogo from './HandShakeLogo';
import './../../css/registration.css';
import {Link} from 'react-router-dom';

function PreLoginHeader(){

  return(
    <div className="prelogin-header">
      <Link to='/'>
      <HandShakeLogo />
      </Link>
    </div>
  )
}
export default PreLoginHeader;

