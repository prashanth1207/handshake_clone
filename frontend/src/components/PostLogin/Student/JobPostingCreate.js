import React, { useState } from 'react';
import axios from 'axios';
import './companyprofile.css';
import { useParams, Redirect } from 'react-router-dom';
import {Form,Button,Alert} from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import {storedUserInfo} from './../../../utility'

function JobPostingCreate(props) {
  let companyProfileId = storedUserInfo().profile.id;
  let [errorMsg,setErrorMsg] = useState(null);
  let [updateSuccess,setupdateSuccess] = useState(false);
  let handleSubmit = (e) =>{
    e.preventDefault();
    let form = e.currentTarget;
    let selectedJobCategoryList = getSelectValues(form.jobCategory);
    let formData = {
      jobTitle: form.jobTitle.value,
      postingDate: form.postingDate.value,
      applicationDeadline: form.applicationDeadline.value,
      location: form.location.value,
      salary: form.salary.value,
      jobDescription: form.jobDescription.value,
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
    errTag = <Alert variant='danger'>{errorMsg}</Alert>
  }
  if(updateSuccess){
    return <Redirect to={`/company/job_postings`} />
  }
  return (
    <main class="clearfix new-topbar-nux" id="skip-to-content">
      <h2>Create Job Posting</h2>
      {errTag}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>jobTitle</Form.Label>
          <Form.Control name='jobTitle' />
        </Form.Group>
        <Form.Group>
          <Form.Label>postingDate</Form.Label>
          <Form.Control name='postingDate' type='date' min={new Date().toISOString().split('T')[0]}  defaultValue={new Date().toISOString().split('T')[0]}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>applicationDeadline</Form.Label>
          <Form.Control name='applicationDeadline' type='date' min={new Date().toISOString().split('T')[0]}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>location</Form.Label>
          <Form.Control name='location' />
        </Form.Group>
        <Form.Group>
          <Form.Label>salary</Form.Label>
          <Form.Control name='salary' />
        </Form.Group>
        <Form.Group>
          <Form.Label>jobDescription</Form.Label>
          <Form.Control name='jobDescription' as="textarea" rows="3"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>jobCategoryList</Form.Label>
          <Form.Control as="select" multiple  name='jobCategory'>
            <option key='Full Time' value='Full Time'>Full Time</option>
            <option key='Part Time' value='Part Time'>Part Time</option>
            <option key='Internship' value='Internship'>Internship</option>
            <option key='On Campus' value='On Campus'>On Campus</option>
          </Form.Control>
        </Form.Group>
        <Button type='submit'>Create</Button>
      </Form>
    </main>    
  );
}

function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

export default JobPostingCreate;