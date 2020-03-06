import React from 'react';
import {Route, Redirect} from 'react-router';
import {isLoggedIn, isStudent, isCompany, storedUserInfo} from './utility';

export const PrivateStudentRoute = ({component: Component, ...rest}) => {
  return (
    
    <Route {...rest} render={props => {
      let authentic_user = isLoggedIn() && isStudent();
      if(authentic_user){
        return <Component {...props} />
      }else{
        console.log('Not authorized to go this url');
        return <Redirect to="/signin" />
      }
      }} />
  );
};

export const PrivateOwnStudentRoute = ({component: Component, ...rest}) => {
  return (
    
    <Route {...rest} render={props => {
      let authentic_user = isLoggedIn() && isStudent() && storedUserInfo().profile.id === parseInt(props.match.params.studentProfileId);
      if(authentic_user){
        return <Component {...props} />
      }else{
        console.log('Not authorized to go this url');
        return <Redirect to="/signin" />
      }
      }} />
  );
};

export const PrivateCompanyRoute = ({component: Component, ...rest}) => {
  return (

      <Route {...rest} render={props => {
        let authentic_user = isLoggedIn() && isCompany();
        if(authentic_user){
          return <Component {...props} />
        }else{
          console.log('Not authorized to go this url');
          return <Redirect to="/signin" />
        }
      }} />
  );
};

export const PrivateOwnCompanyRoute = ({component: Component, ...rest}) => {
  return (

      <Route {...rest} render={props => {
        let authentic_user = isLoggedIn() && isCompany() && storedUserInfo().profile.id === parseInt(props.match.params.companyProfileId);
        if(authentic_user){
          return <Component {...props} />
        }else{
          console.log('Not authorized to go this url');
          return <Redirect to="/signin" />
        }
      }} />
  );
};

export const PrivateRoute = ({component: Component, ...rest}) => {
  return (

      <Route {...rest} render={props => (
        isLoggedIn() ? <Component {...props} /> : <Redirect to="/signin" />
      )} />
  );
};