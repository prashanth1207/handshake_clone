import React,{useState} from 'react';
import axios from 'axios';

function CompanySignUp(){
  const [name, setName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');

  function onSubmit(e){
    e.preventDefault();
    let form_data = {
      userData: {
        emailId: emailId,
        password: password,
        role: 'Company'
      },
      profileData:{
        name: name,
        location: location
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
      <input type='text' name='name' value={name} onChange={(e)=>setName(e.target.value)} placeholder="Company Name" />
        <br/>
        <input type='text' name='emailId' value={emailId} onChange={(e)=>setEmailId(e.target.value)} placeholder="Email Id" />
        <br />
        <input type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
        <br />
        <input type='text' name='location' value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="Location" />
        <br/>
        <input type='submit' value='Register' onClick={onSubmit}/>
      </form>
    </div>
  )
}

export default CompanySignUp;