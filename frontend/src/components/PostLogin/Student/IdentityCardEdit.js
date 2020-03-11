import React, { useState } from 'react';
import {Card, Image, Button, Form, Modal, Alert} from 'react-bootstrap';
import CameraSvg from './../../CameraSvg';
import axios from 'axios';
import {studentProfileSubmit} from './../../../utility'

function IdentityCardEdit(props) {
  let [showModal,setShowModal] = useState(false);
  let [fileUploadErrorMsg,setfileUploadErrorMsg] = useState(null);
  let [profileErrorMsg,setprofileErrorMsg] = useState(null);
  let studentProfile = props.studentProfile
  let educationDetails = studentProfile.educationDetails[0] || {}
  let image_path = `http://localhost:3001/images/profile_pics/${studentProfile.userId}.png?${showModal}`;
  
  let handleClose = e => setShowModal(false)
  let handleOpen = e => setShowModal(true)

  let handleFileUpload = (e) =>{
    let formData = new FormData();
    formData.append('profilePic', e.currentTarget.form.elements.profilePic.files[0]);
    axios.post(`http://localhost:3001/student_profile/${studentProfile.id}/upload_profile_pic`,formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }})
    .then(resp => {
      if(resp.status === 200 && resp.data.success){
        setShowModal(false);
      }else{
      fileUploadErrorMsg(<Alert variant='danger'>{resp.data.error}</Alert>);
      }
    });
  }
  let handleProfileSubmit = async (e) =>{
    e.preventDefault();
    let form = e.currentTarget;
    let formData = {
      studentProfile: {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            currentCollegeName: form.currentCollegeName.value
      }
    }
    let resp = await studentProfileSubmit(formData,studentProfile.id);
    if(resp.status === 200 && resp.data.success){
      props.setstateObj({
        state: 'show', 
        studentProfile: Object.assign({},studentProfile,formData.studentProfile)
      });
    }else{
    setprofileErrorMsg(<Alert variant='danger'>{resp.data.error}</Alert>)
    }
  }
  return (
    <Card className="text-center" fluid>
      <Card.Body>
        {profileErrorMsg}
        <Form onSubmit={handleProfileSubmit}>
          <Button variant='secondary' onClick={handleOpen}>
          <Image style={{'max-width':'200px','max-height':'200px'}} variant="center" src={image_path} roundedCircle thumbnail fluid/>
            <div>
              <CameraSvg/>
              <div>Edit Photo</div>
            </div>
          </Button>
          <Form.Control name='firstName' placeholder='First Name' defaultValue={studentProfile.firstName} required/>
          <Form.Control name='lastName' placeholder='Last Name' defaultValue={studentProfile.lastName} required/>
          <Form.Control name='currentCollegeName' placeholder='Current College Name' defaultValue={studentProfile.currentCollegeName} required/>
          <Button variant='secondary' onClick={e => props.setstateObj({state: 'show', studentProfile: studentProfile})} style={{float: 'right'}}>
            Cancel
          </Button>&nbsp;
          <Button variant='primary' type='submit' style={{float: 'right'}}>
            Save
          </Button>
        </Form>
        <Modal show={showModal} onHide={handleClose}>
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {fileUploadErrorMsg}
                <Form.Group>
                  <Form.Label>Browse Photos</Form.Label>
                  <Form.Control type='file' name='profilePic' required accept=".png" />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleFileUpload}>
                Upload
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Card.Body>
    </Card>
  );
}

export default IdentityCardEdit;