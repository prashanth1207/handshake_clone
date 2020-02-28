import React from 'react';
import {useParams, Redirect} from 'react-router-dom'
import StudentBody from './StudentBody'
import RedirectToHome from './../../RedirectToHome'

export default function StudentProfile(){
  let {id} = useParams();
  return(
    <div>
      <RedirectToHome />
      <StudentBody studentProfileId={id}/>
    </div>
  )
}