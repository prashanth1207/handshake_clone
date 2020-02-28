import React,{useState} from 'react';
import axios from 'axios';

function StudentSignUp(){

  const [firstName,handleFirstName] = useState('');
  const [lastName,handleLastName] = useState('');
  const [emailId,handleEmailId] = useState('');
  const [password,handlePassword] = useState('');
  const [currentCollegeName,handlecurrentCollegeName] = useState('');

  function onSubmit(e){
    e.preventDefault();
    let form_data = {
      userData: {
        emailId: emailId,
        password: password,
        role: 'Student'
      },
      profileData:{
        firstName: firstName,
        lastName: lastName,
        currentCollegeName: currentCollegeName
      }
    }
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/users/register',form_data)
      .then(response =>{
        if(response.status === 200){
          if (response.data.success === true){
            sessionStorage.setItem('userInfo',JSON.stringify(response.data.userInfo))
          } else{
            console.log('!!!!!!!!!DAMN!!!!!!!');
          }
      }
      })

  }
  return(
    <div class='user-company-signup div-center-align'>
      <form>
        <input type='text' name='firstName' value={firstName} onChange={(e) => handleFirstName(e.target.value)} placeholder="First Name"/>
        <br/>
        <input type='text' name='lastName' value={lastName} onChange={(e) => handleLastName(e.target.value)} placeholder="Last Name" />
        <br/>
        <input type='text' name='emailId' value={emailId} onChange={(e) => handleEmailId(e.target.value)} placeholder="Email Id" />
        <br />
        <input type='password' name='password' value={password} onChange={(e) => handlePassword(e.target.value)} placeholder="Password" />
        <br />
        <input type='text' name='currentCollegeName' value={currentCollegeName} onChange={(e) => handlecurrentCollegeName(e.target.value)} placeholder="College" />
        <br/>
        <input type='submit' value='Register' onClick={onSubmit} />
      </form>
    </div>
  )
}

export default StudentSignUp; 