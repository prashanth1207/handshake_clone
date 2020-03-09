import React, { useState } from 'react';
import './companyprofile.css'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {Form, Button,Alert} from 'react-bootstrap';
import {DEGREES,MAJORS} from '../../../utility'

function StudentBodyEdit(props) {
  //basic profile
  let {studentProfile} = props.studentProfileResp;
  //education details
  let educationDetails = studentProfile.educationDetails[0] || {};
  //experience details
  let experienceDetails = studentProfile.experienceDetails[0] || {};


  let [errorMsg,seterrorMsg] = useState(null);
  let [updateSuccess,setUpdateSuccess] = useState(false);

  let handleSubmit = (e) => {
    e.preventDefault();
    let form = e.currentTarget;
    let formData = {
      studentProfile: {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        currentCollegeName: form.currentCollegeName.value,
        city: form.city.value,
        state: form.state.value,
        country: form.country.value,
        careerObjective: form.careerObjective.value,
        phoneNumber: form.phoneNumber.value,
        skillSet: form.skillSet.value,
        dob: form.dob.value,
      },
      educationDetails: {
        id: educationDetails.id,
        collegeName: form.collegeName.value,
        collegeLocation: form.collegeLocation.value,
        degree: form.degree.value,
        major: form.major.value,
        yearOfPassing: form.yearOfPassing.value,
        currentCgpa: form.currentCgpa.value,
        highestDegree: true
      },
      experienceDetails: {
        id: experienceDetails.id,
        companyName: form.companyName.value,
        title: form.title.value,
        companyLocation: form.companyLocation.value,
        startDate: form.startDate.value,
        endDate: form.endDate.value,
        workDescription: form.workDescription.value
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

  let degreeSelectionTag = DEGREES.map(degree => {
  return <option key={degree} defaultValue={degree}>{degree}</option>
  })

  let majorSelectionTag = MAJORS.map(major => {
    return <option key={major} defaultValue={major}>{major}</option>
    })

  let errTag = null;
  if(errorMsg){
    errTag = <Alert variant='danger'>{errorMsg}</Alert>
  }
  if(updateSuccess){
    return <Redirect to={`/student_profile/${studentProfile.id}`} />
  }
  return (
    <main class="clearfix new-topbar-nux" id="skip-to-content">
      <Form onSubmit={handleSubmit}>
        {errTag}
        <Form.Group>
          <Form.Label>firstName</Form.Label>
          <Form.Control type='text' name='firstName' defaultValue={studentProfile.firstName}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>lastName</Form.Label>
          <Form.Control type='text' name='lastName' defaultValue={studentProfile.lastName}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>currentCollegeName</Form.Label>
          <Form.Control type='text' name='currentCollegeName' defaultValue={studentProfile.currentCollegeName}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>city</Form.Label>
          <Form.Control type='text' name='city' defaultValue={studentProfile.city}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>state</Form.Label>
          <Form.Control type='text' name='state' defaultValue={studentProfile.state}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>country</Form.Label>
          <Form.Control type='text' name='country' defaultValue={studentProfile.country}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>careerObjective</Form.Label>
          <Form.Control as='textarea' name='careerObjective' defaultValue={studentProfile.careerObjective}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>phoneNumber</Form.Label>
          <Form.Control type='tel' name='phoneNumber' placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" defaultValue={studentProfile.phoneNumber}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>skillSet</Form.Label>
          <Form.Control type='text' name='skillSet' placeholder="AJAX,CSS,Front end" defaultValue={studentProfile.skillSet}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>dob</Form.Label>
          <Form.Control type='date' name='dob' defaultValue={studentProfile.dob}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>collegeName</Form.Label>
          <Form.Control type='text' name='collegeName' defaultValue={educationDetails.collegeName}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>collegeLocation</Form.Label>
          <Form.Control type='text' name='collegeLocation' defaultValue={educationDetails.collegeLocation}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>degree</Form.Label>
          <Form.Control as='select' name='degree' defaultValue={educationDetails.degree}>
          {degreeSelectionTag}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>major</Form.Label>
          <Form.Control as='select' name='major' defaultValue={educationDetails.major}>
            {majorSelectionTag}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>yearOfPassing</Form.Label>
          <Form.Control type='number' pattern="[0-9]{4}" name='yearOfPassing' defaultValue={educationDetails.yearOfPassing}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>currentCgpa</Form.Label>
          <Form.Control type='number' step="any" name='currentCgpa' defaultValue={educationDetails.currentCgpa}/>
        </Form.Group>
        {/* <Form.Group>
          <Form.Label>highestDegree</Form.Label>
          <Form.Control disable type='text' name='highestDegree' defaultValue={educationDetails.highestDegree}/>
        </Form.Group> */}
        <Form.Group>
          <Form.Label>companyName</Form.Label>
          <Form.Control type='text' name='companyName' defaultValue={experienceDetails.companyName}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control type='text' name='title' defaultValue={experienceDetails.title}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>companyLocation</Form.Label>
          <Form.Control type='text' name='companyLocation' defaultValue={experienceDetails.companyLocation}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>startDate</Form.Label>
          <Form.Control type='date' name='startDate' defaultValue={experienceDetails.startDate}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>endDate</Form.Label>
          <Form.Control type='date' name='endDate' defaultValue={experienceDetails.endDate}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>workDescription</Form.Label>
          <Form.Control as="textarea" name='workDescription' defaultValue={experienceDetails.workDescription}/>
        </Form.Group>
        <Button type='submit'>Update</Button>
      </Form>
    </main>    
  );
}

export default StudentBodyEdit;