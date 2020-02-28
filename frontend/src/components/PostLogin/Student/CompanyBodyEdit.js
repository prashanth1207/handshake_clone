import React,{useEffect, useState} from 'react';
import './companyprofile.css'
import axios from 'axios'
import { Redirect } from 'react-router-dom';

export default function CompanyBodyEdit(props){
  let {companyProfile} = props.companyProfileResp;
  let [name,setname] = useState(companyProfile.name);
  let [location,setlocation] = useState(companyProfile.location);
  let [description,setdescription] = useState(companyProfile.description);
  let [contactInformation,setcontactInformation] = useState(companyProfile.contactInformation);
  let [errorMsg,seterrorMsg] = useState(null);
  let [updateSuccess,setUpdateSuccess] = useState(false);
  let handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      name: name,
      location: location,
      description: description,
      contactInformation: contactInformation
    }
    axios.defaults.withCredentials = false;
    axios.post(`http://localhost:3001/company_profile/${companyProfile.id}`,formData)
      .then(resp => {
        if(resp.status === 200 && resp.body.success){
            setUpdateSuccess(true)
        }else{
          seterrorMsg(resp.data.error);
        }
      });
  }
  let errTag = null;
  if(errorMsg){
    errTag = <p color='red'>{errorMsg}</p>
  }
  if(updateSuccess){
    return <Redirect to={`/student/company_profile/${companyProfile.id}`} />
  }
  return(
    <div>
      <div class="clearfix new-topbar-nux">
        <div data-hook="container" class="style__container___15r1p style__large___3HKaH style__fitted___2ndoo">
          <div class="style__cover___EcB_L style__card___1rhof">
            <h2 class="style__heading___29i1Z style__extra-large___PY8Kd">
              Edit  {name}
            </h2>
            <form class='form-group comp-prof-edit'>
              {errTag}
              <div>
                <label class="control-label">CompanyName</label>
                <div>
                <input type='text' name='name' value={name} onChange={e => setname(e.target.value)}/>
                </div>
              </div>
              <br />
              <div>
                <label class="control-label">Location</label>
                <div>
                  <input type='text' name='location' value={location} onChange={e => setlocation(e.target.value)}/>
                </div>
              </div>
              <br />
              <div>
                <label class="control-label">Description</label>
                <div>
                  <textarea name='description' value={description} onChange={e => setdescription(e.target.value)}/>
                  </div>
              </div>
              <br />
              <div>
                <label class="control-label">Contact Information</label>
                <div>
                <textarea type='text' name='contactInformation' value={contactInformation} onChange={e => setcontactInformation(e.target.value)}/>
                </div>
              </div>
              <br />
              <div>
                <input type='submit' value='Update' onClick={handleSubmit}/>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>  
    </div>
  )
}