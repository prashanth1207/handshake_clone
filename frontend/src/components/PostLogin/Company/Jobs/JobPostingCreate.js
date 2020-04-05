import React, { useState } from 'react';
import axios from 'axios';
//import './companyprofile.css';
import { Redirect } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { rooturl } from '../../../../config/config';
import { storedUserInfo } from '../../../../utility';

function JobPostingCreate(props) {
  const companyProfileId = storedUserInfo().profile._id;
  const [errorMsg, setErrorMsg] = useState(null);
  const [updateSuccess, setupdateSuccess] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const selectedJobCategoryList = getSelectValues(form.jobCategory);
    const formData = {
      jobTitle: form.jobTitle.value,
      postingDate: form.postingDate.value,
      applicationDeadline: form.applicationDeadline.value,
      location: form.location.value,
      salary: form.salary.value,
      jobDescription: form.jobDescription.value,
      jobCategory: selectedJobCategoryList.join(','),
    };
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
axios.post(`${rooturl}/job_postings/${companyProfileId}/create`, formData, {
      validateStatus: false,
    }).then((resp) => {
      console.dir(resp);
      if (resp.status === 200 && resp.data.success) {
        setupdateSuccess(true);
      } else {
        setErrorMsg(resp.data.error);
      }
    });
  };
  let errTag = null;
  if (errorMsg) {
    errTag = <Alert variant="danger">{errorMsg}</Alert>;
  }
  if (updateSuccess) {
    return <Redirect to="/company/job_postings" />;
  }
  return (
    <main className="clearfix new-topbar-nux" id="skip-to-content">
      <h2>Create Job Posting</h2>
      {errTag}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Job Title</Form.Label>
          <Form.Control name="jobTitle" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Posting Date</Form.Label>
          <Form.Control name="postingDate" type="date" min={new Date().toISOString().split('T')[0]} defaultValue={new Date().toISOString().split('T')[0]} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Application Deadline</Form.Label>
          <Form.Control name="applicationDeadline" type="date" min={new Date().toISOString().split('T')[0]} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control name="location" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Salary</Form.Label>
          <Form.Control name="salary" type="currency" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Job Description</Form.Label>
          <Form.Control name="jobDescription" as="textarea" rows="3" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Job Category</Form.Label>
          <Form.Control as="select" multiple name="jobCategory">
            <option key="Full Time" value="Full Time">Full Time</option>
            <option key="Part Time" value="Part Time">Part Time</option>
            <option key="Internship" value="Internship">Internship</option>
            <option key="On Campus" value="On Campus">On Campus</option>
          </Form.Control>
        </Form.Group>
        <Button type="submit">Create</Button>
      </Form>
    </main>
  );
}

function getSelectValues(select) {
  const result = [];
  const options = select && select.options;
  let opt;

  for (let i = 0, iLen = options.length; i < iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

export default JobPostingCreate;
