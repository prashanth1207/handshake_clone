import React, { useState } from 'react';
import axios from 'axios';
import './companyprofile.css'
import { useParams, Redirect } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';

function JobPostingCreate(props) {
  let {companyProfileId} = useParams();
  let [errorMsg,setErrorMsg] = useState(null);
  let [jobTitle, setjobTitle] = useState('');
  let [postingDate, setpostingDate] = useState(
    new Date().toISOString().split('T')[0]);
  let [applicationDeadline, setapplicationDeadline] = useState('');
  let [location, setlocation] = useState('');
  let [salary, setsalary] = useState('');
  let [jobDescription, setjobDescription] = useState('');
  let [newJobPostingId, setnewJobPostingId] = useState(null);
  let jobCategoryList = [
    {name: 'Full Time',id:'Full Time'},
    {name: 'Part Time',id:'Part Time'},
    {name: 'Internship',id:'Internship'},
    {name: 'On Campus',id:'On Campus'},
  ]
  let selectedJobCategoryList = [];
  let onChangejobCategory = (selectedList) => {
    selectedJobCategoryList = selectedList.map(cat => cat.id)
  }
  let [updateSuccess,setupdateSuccess] = useState(false);
  console.log(postingDate)
  let handleSubmit = (e) =>{
    e.preventDefault();
    let formData = {
      jobTitle: jobTitle,
      postingDate: postingDate,
      applicationDeadline: applicationDeadline,
      location: location,
      salary: salary,
      jobDescription: jobDescription,
      jobCategory: selectedJobCategoryList.join(',')
    }
    axios.post(`http://localhost:3001/job_postings/${companyProfileId}/create`, formData, { 
      validateStatus: false 
    }).then((resp)=>{
      console.dir(resp)
      if(resp.status === 200 && resp.data.success){
        setupdateSuccess(true)
      }else{
        setErrorMsg(resp.data.error);
      }
    })
  }
  let errTag = null;
  if(errorMsg){
    errTag = <p class='error-msg'>{errorMsg}</p>
  }
  if(updateSuccess){
    return <Redirect to={`/company/job_postings`} />
  }
  return (
    <main class="clearfix new-topbar-nux" id="skip-to-content">
      <div class="student-profile-container">
        <div class="student-profile">
          <div data-hook="container" class="style__container___15r1p style__medium___2PHCb">
            <div class="style__profile___26D5X">
              <div class="row style__profile-row___KAiYi">
                <div class="col-md-12">
                <div class="style__card___1rhof" data-hook="card">
                  <div class="style__card-item___B1f7m style__large___Kv76x">
                  <h2 class="style__heading___29i1Z style__extra-large___PY8Kd">
                    Create Job Posting
                  </h2>
                  <form class='form-group comp-prof-edit' onSubmit={handleSubmit}>
                    {errTag}
                    <div><label class="control_label">jobTitle: </label>&nbsp;
                      <input type='text' name='jobTitle' value={jobTitle} onChange={e => setjobTitle(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">postingDate: </label>&nbsp;
                      <input type='date' name='postingDate' value={postingDate} onChange={e => setpostingDate(e.target.value)}/>
                    </div>
                    <br />
                    <div class='hide'><label class="control_label">applicationDeadline: </label>&nbsp;
                      <input type='date' name='applicationDeadline' value={applicationDeadline} onChange={e => setapplicationDeadline(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">location: </label>&nbsp;
                      <input type='text' name='location' value={location} onChange={e => setlocation(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">salary: </label>&nbsp;
                      <input type='text' name='salary' value={salary} onChange={e => setsalary(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">jobDescription: </label>&nbsp;
                      <input type='text' name='jobDescription' value={jobDescription} onChange={e => setjobDescription(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">jobCategory: </label>&nbsp;
                      <Multiselect
                        options={jobCategoryList} // Options to display in the dropdown
                        onSelect={onChangejobCategory} // Function will trigger on select event
                        onRemove={onChangejobCategory} // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                      />
                    </div>
                    <br />
                    <input type='submit' value='Create' />
                  </form>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>    
  );
}

export default JobPostingCreate;