import React from 'react';

function StudentSignUp(){
  return(
    <div class='user-company-signup div-center-align'>
      <form>
        <input type='text' name='firstName' value='' placeholder="First Name"/>
        <br/>
        <input type='text' name='lastName' value='' placeholder="Last Name" />
        <br/>
        <input type='text' name='emailId' value='' placeholder="Email Id" />
        <br />
        <input type='password' name='password' value='' placeholder="Password" />
        <br />
        <input type='text' name='college' value='' placeholder="College" />
        <br/>
        <input type='submit' value='Register' />
      </form>
    </div>
  )
}

export default StudentSignUp; 