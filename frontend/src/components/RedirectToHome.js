import React from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';

let RedirectToHome = (props) => {
  if(!props.loggedIn){
      return <Redirect to={'/'}/>
  }
  return null;
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}
let ConnectedRedirectToHome = connect(mapStateToProps)(RedirectToHome)
export default ConnectedRedirectToHome;