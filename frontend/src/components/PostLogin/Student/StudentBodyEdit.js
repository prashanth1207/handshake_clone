import React, { useState } from 'react';
import './companyprofile.css'
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function StudentBodyEdit(props) {
  //basic profile
  let {studentProfile} = props.studentProfileResp;
  let [firstName,setfirstName] = useState(studentProfile.firstName);
  let [lastName,setlastName] = useState(studentProfile.lastName);
  let [currentCollegeName,setcurrentCollegeName] = useState(studentProfile.currentCollegeName);
  let [city,setcity] = useState(studentProfile.city);
  let [state,setstate] = useState(studentProfile.state);
  let [country,setcountry] = useState(studentProfile.country);
  let [careerObjective,setcareerObjective] = useState(studentProfile.careerObjective);
  let [phoneNumber,setphoneNumber] = useState(studentProfile.phoneNumber);
  let [skillSet,setskillSet] = useState(studentProfile.skillSet);
  let [dob,setdob] = useState(studentProfile.dob);

  //education details
  let educationDetails = studentProfile.educationDetails[0] || {};
  let [collegeName,setcollegeName] = useState(educationDetails.collegeName);
  let [collegeLocation,setcollegeLocation] = useState(educationDetails.collegeLocation);
  let [degree,setdegree] = useState(educationDetails.degree);
  let [major,setmajor] = useState(educationDetails.major);
  let [yearOfPassing,setyearOfPassing] = useState(educationDetails.yearOfPassing);
  let [currentCgpa,setcurrentCgpa] = useState(educationDetails.currentCgpa);
  let [highestDegree] = useState(true);

  //experience details
  let experienceDetails = studentProfile.experienceDetails[0] || {};
  let [companyName, setcompanyName]  = useState(experienceDetails.companyName)
  let [title, settitle]  = useState(experienceDetails.title)
  let [companyLocation, setcompanyLocation]  = useState(experienceDetails.companyLocation)
  let [startDate, setstartDate]  = useState(experienceDetails.startDate)
  let [endDate, setendDate]  = useState(experienceDetails.endDate)
  let [workDescription, setworkDescription]  = useState(experienceDetails.workDescription)


  let [errorMsg,seterrorMsg] = useState(null);
  let [updateSuccess,setUpdateSuccess] = useState(false);

  let handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      studentProfile: {
        firstName: firstName,
        lastName: lastName,
        currentCollegeName: currentCollegeName,
        city: city,
        state: state,
        country: country,
        careerObjective: careerObjective,
        phoneNumber: phoneNumber,
        skillSet: skillSet,
        dob: dob,
      },
      educationDetails: {
        id: educationDetails.id,
        collegeName: collegeName,
        collegeLocation: collegeLocation,
        degree: degree,
        major: major,
        yearOfPassing: yearOfPassing,
        currentCgpa: currentCgpa,
        highestDegree: highestDegree
      },
      experienceDetails: {
        id: experienceDetails.id,
        companyName: companyName,
        title: title,
        companyLocation: companyLocation,
        startDate: startDate,
        endDate: endDate,
        workDescription: workDescription
      }
    }
    axios.defaults.withCredentials = false;
    axios.post(`http://localhost:3001/student_profile/${studentProfile.id}`,formData)
      .then(resp => {
        if(resp.status === 200 && resp.data.success){
            setUpdateSuccess(true)
        }else{
          seterrorMsg(resp.data.error);
        }
      });
  }

  let errTag = null;
  if(errorMsg){
    errTag = <p class='error-msg'>{errorMsg}</p>
  }
  if(updateSuccess){
    return <Redirect to={`/student/student_profile/${studentProfile.id}`} />
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
                    Edit Profile
                  </h2>
                  <form class='form-group comp-prof-edit'>
                    {errTag}
                    <div class='comp-prof-edit'>
                      <h3 class="style__heading___29i1Z style__extra-large___PY8Kd">
                        Edit Basic Details
                      </h3>
                      <div class='comp-prof-edit'>
                        <div><label class="control_label">first Name:</label>&nbsp;
                          <input type='text' name='firstName' value={firstName} onChange={e => setfirstName(e.target.value)}/>
                        </div>
                        <br />
                    <div><label class="control_label">last Name:</label>&nbsp;
                      <input type='text' name='lastName' value={lastName} onChange={e => setlastName(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">current College Name:</label>&nbsp;
                      <input type='text' name='currentCollegeName' value={currentCollegeName} onChange={e => setcurrentCollegeName(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">city:</label>&nbsp;
                      <input type='text' name='city' value={city} onChange={e => setcity(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">state:</label>&nbsp;
                      <input type='text' name='state' value={state} onChange={e => setstate(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">country:</label>&nbsp;
                      <input type='text' name='country' value={country} onChange={e => setcountry(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">career Objective:</label>&nbsp;
                      <textarea name='careerObjective' value={careerObjective} onChange={e => setcareerObjective(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">phone Number:</label>&nbsp;
                      <input type='text' name='phoneNumber' value={phoneNumber} onChange={e => setphoneNumber(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">skillSet(comma seperated):</label>&nbsp;
                      <input type='text' name='skillSet' value={skillSet} onChange={e => setskillSet(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">dob:</label>&nbsp;
                      <input type='date' name='dob' value={dob} onChange={e => setdob(e.target.value)}/>
                    </div>
                    <br />
                      </div>
                    </div>
                    <div class='comp-prof-edit'>
                      <h3 class="style__heading___29i1Z style__extra-large___PY8Kd">
                        Edit Education Details
                      </h3>
                      <div class='comp-prof-edit'>
                      <div><label class="control_label">company Name:</label>&nbsp;
                      <input type='text' name='companyName' value={companyName} onChange={e => setcompanyName(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">title:</label>&nbsp;
                      <input type='text' name='title' value={title} onChange={e => settitle(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">company Location:</label>&nbsp;
                      <input type='text' name='companyLocation' value={companyLocation} onChange={e => setcompanyLocation(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">start Date:</label>&nbsp;
                      <input type='date' name='startDate' value={startDate} onChange={e => setstartDate(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">end Date:</label>&nbsp;
                      <input type='date' name='endDate' value={endDate} onChange={e => setendDate(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">work Description:</label>&nbsp;
                      <textarea name='workDescription' value={workDescription} onChange={e => setworkDescription(e.target.value)}/>
                    </div>
                    <br />
                      </div>
                    </div>
                    <div class='comp-prof-edit'>
                      <h3 class="style__heading___29i1Z style__extra-large___PY8Kd">
                        Edit Experience Details
                      </h3>
                      <div class='comp-prof-edit'>
                      <div><label class="control_label">college Name:</label>&nbsp;
                      <input type='text' name='collegeName' value={collegeName} onChange={e => setcollegeName(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">college Location:</label>&nbsp;
                      <input type='text' name='collegeLocation' value={collegeLocation} onChange={e => setcollegeLocation(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">degree:</label>&nbsp;
                      <input type='text' name='degree' value={degree} onChange={e => setdegree(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">major:</label>&nbsp;
                      <input type='text' name='major' value={major} onChange={e => setmajor(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">year Of Passing:</label>&nbsp;
                      <input type='number' name='yearOfPassing' value={yearOfPassing} onChange={e => setyearOfPassing(e.target.value)}/>
                    </div>
                    <br />
                    <div><label class="control_label">current Cgpa:</label>&nbsp;
                      <input type="number" step="0.01" name='currentCgpa' value={currentCgpa} onChange={e => setcurrentCgpa(e.target.value)}/>
                    </div>
                    <br />
                      </div>
                    </div>
                    <div>
                      <input type='submit' value='Update' onClick={handleSubmit}/>
                    </div>
                    <br />
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

export default StudentBodyEdit;