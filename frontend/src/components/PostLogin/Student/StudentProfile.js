import React from 'react';
import {useParams} from 'react-router-dom'
import StudentHeader from './StudentHeader'
import StudentBody from './StudentBody'

export default function StudentProfile(){
  let {id} = useParams();
  return(
    <div>
      <StudentBody studentProfileId={id}/>
    </div>
  )
}