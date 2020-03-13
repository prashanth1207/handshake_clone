import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Alert, Button } from 'react-bootstrap';
import { rooturl } from '../../../config/config';

export default function CompanyBodyEdit(props) {
  const { companyProfile } = props.companyProfileResp;
  const [errorMsg, seterrorMsg] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData();
    formData.append('name', form.name.value);
    formData.append('location', form.location.value);
    formData.append('description', form.description.value);
    formData.append('contactInformation', form.contactInformation.value);
    formData.append('companyLogo', form.elements.companyLogo.files[0]);
    axios.defaults.withCredentials = false;
    axios.post(`${rooturl}/company_profile/${companyProfile.id}`, formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        if (resp.status === 200 && resp.data.success) {
          setUpdateSuccess(true);
        } else {
          seterrorMsg(<Alert variant="danger">resp.body.error</Alert>);
        }
      });
  };
  let errTag = null;
  if (errorMsg) {
    errTag = <p color="red">{errorMsg}</p>;
  }
  if (updateSuccess) {
    return <Redirect to={`/company_profile/${companyProfile.id}`} />;
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {errorMsg}
        <Form.Group>
          <Form.Label>Upload Company Logo</Form.Label>
          <Form.Control name="companyLogo" type="file" accept=".png" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" defaultValue={companyProfile.name} placeholder="Name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control name="location" defaultValue={companyProfile.location} placeholder="Location" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" defaultValue={companyProfile.description} placeholder="Description" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contact Information</Form.Label>
          <Form.Control as="textarea" name="contactInformation" defaultValue={companyProfile.contactInformation} placeholder="Contact Information" />
        </Form.Group>
        <Button variant="primary" type="submit">Update</Button>
      </Form>
    </div>
  );
}
