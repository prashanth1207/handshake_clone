import React from 'react';

function CompanySignUp(){
  return(
    <div class='user-company-signup div-center-align'>
      <form>
        <input type='text' name='name' value='' placeholder="Company Name" />
        <br/>
        <input type='text' name='emailId' value='' placeholder="Email Id" />
        <br />
        <input type='password' name='password' value='' placeholder="Password" />
        <br />
        <input type='text' name='location' value='' placeholder="Location" />
        <br/>
        <input type='submit' value='Register' />
      </form>
    </div>
  )
}

export default CompanySignUp; 