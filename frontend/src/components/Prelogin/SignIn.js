import React,{ useState } from 'react';

function SignIn(){
  let [formData,setValues] = useState({});

  function handleChange(e){
    let name = e.target.name
    formData = setValues({name : e.target.value})
    console.log(JSON.stringify(formData))
  }
  return(
    <div class='user-signin div-center-align'>
      {console.log('inside Sign in')}
      <form>
        <input type='text' name='emailId' value={formData['emailId']} placeholder="Email Id" onChange={handleChange}/>
        <br/>
        <input type='password' name='password' value='' placeholder="Password" onChange={handleChange} />
        <br/>
        <input type='submit' value='Login' />
      </form>
    </div>
  )
}

export default SignIn; 