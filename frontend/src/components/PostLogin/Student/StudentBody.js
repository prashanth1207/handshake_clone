import React, { useEffect, useState } from 'react'
import './studentbody.css';
import LeftDetails from './LeftDetails'
import RightDetails from './RightDetails'
import axios from 'axios'

export default function StudentBody(props){
  let [studentProfileResp,setData] = useState({status: 'loading', studentProfile: null});
  useEffect(() =>{
    if(studentProfileResp.status === 'loading'){
      axios.get(`http://localhost:3001/student_profile/${props.studentProfileId}`, { 
        validateStatus: false 
      }).then((resp)=>{
        console.log(resp.status);
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
    <main class="clearfix" id="skip-to-content">
      <div class="student-profile-container">
        <div class="student-profile">
          <div data-hook="container" class="style__container___15r1p style__medium___2PHCb">
            <div class="style__profile___26D5X">
              <div class="row style__profile-row___KAiYi">
                <div class="col-md-4">
                  <LeftDetails studentProfile={studentProfileResp.studentProfile} />
                </div>
                <div class="col-md-8" id="main-content">
                  <RightDetails studentProfile={studentProfileResp.studentProfile} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}