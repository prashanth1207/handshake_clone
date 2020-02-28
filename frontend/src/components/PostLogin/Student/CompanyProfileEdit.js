import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import StudentHeader from './StudentHeader'
import CompanyBodyEdit from './CompanyBodyEdit'

export default function CompanyProfileEdit(){
  let {id} = useParams();
  let [companyProfileResp,setData] = useState({status: 'loading', companyProfile: {}});
  useEffect(() =>{
    if(companyProfileResp.status === 'loading'){
      axios.get(`http://localhost:3001/company_profile/${id}`, { 
        validateStatus: false 
      }).then((resp)=>{
        if(resp.status === 200){
          setData({status: 'recordFound',companyProfile: resp.data});
        }else{
          setData({status: 'recordNotFound'});
        }
      })
    }
  });
  if(companyProfileResp.status === 'loading'){
    return <h3>Loading Profile...</h3>
  }else if(companyProfileResp.status === 'recordNotFound'){
    return <h3>Profile Not Found</h3>
  }
  return(
    <div>
      <CompanyBodyEdit companyProfileResp={companyProfileResp}/>
    </div>
  )
}