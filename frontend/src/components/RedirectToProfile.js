import React from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';

let RedirectToProfile = (props) => {
  if(props.loggedIn){
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(userInfo){
      return <Redirect to={`/${userInfo.type}/${userInfo.type}_profile/${userInfo.profile.id}`}/>
    }
  }
  return null;
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}
let ConnectedRedirectToProfile = connect(mapStateToProps)(RedirectToProfile)
export default ConnectedRedirectToProfile;