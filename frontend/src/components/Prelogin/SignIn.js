import React,{ useState} from 'react';
import {connect} from 'react-redux';
import {LoginIn} from '../../redux/actions/index'
import axios from 'axios';
import RedirectToProfile from '../RedirectToProfile';

function SignIn(props){
  let [emailId,setEmailId] = useState('');
  let [password,setPassword] = useState('');
  let [loginSuccess,setLoginSuccess] = useState(false);
  let [errorMsg,setErrorMsg] = useState(null);
  
  function handlePassword(password){
    emailId = setPassword(password);
  }
  
  function handleSubmit(e){
    e.preventDefault();
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    let formData = {
      emailId: emailId,
      password: password
    }
    axios.post('http://localhost:3001/users/login',formData)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                if (response.data.success === true){
                    sessionStorage.setItem('userInfo',JSON.stringify(response.data.userInfo));
                    props.loggedIn();
                } else{
                  setErrorMsg(response.data.errorMessage);
                }
            }
        });
  }
let errMsg = null;
  if(errorMsg){
    errMsg = <p class='error-msg'>errorMsg</p>;
  }
  return(
    <div class='user-signin div-center-align'>
      <RedirectToProfile />
      <br />
      <form>
        {errMsg}
        <input type='text' name='emailId' value={emailId} placeholder="Email Id" onChange={(e) => {setEmailId(e.target.value)}}/>
        <br/>
        <input type='password' name='password' value={password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
        <br/>
        <input type='submit' value='Login' onClick={handleSubmit}/>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  loggedIn: LoginIn
}
let ConnectedSignIn = connect(null,mapDispatchToProps)(SignIn)
export default ConnectedSignIn; 