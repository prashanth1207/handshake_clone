import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentBodyEdit from './StudentBodyEdit' 
import { useParams } from 'react-router-dom';

export default function StudentProfileEdit(props){
  let {id} = useParams();
  let [studentProfileResp,setData] = useState({status: 'loading', studentProfile: null});
  useEffect(() =>{
    if(studentProfileResp.status === 'loading'){
      axios.get(`http://localhost:3001/student_profile/${id}`, { 
        validateStatus: false 
      }).then((resp)=>{
        if(resp.status === 200){
          setData({status: 'recordFound',studentProfile: resp.data});
        }else{
          setData({status: 'recordNotFound'});
        }
      })
    }
  });

  if(studentProfileResp.status === 'loading'){
    return <h3>Loading Profile...</h3>
  }else if(studentProfileResp.status === 'recordNotFound'){
    return <h3>Profile Not Found</h3>
  }
  return(
    <StudentBodyEdit studentProfileResp={studentProfileResp} />
  )
}