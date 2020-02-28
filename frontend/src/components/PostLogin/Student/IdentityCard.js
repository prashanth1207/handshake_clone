import React from 'react';

export default function IdentityCard(props){
  let studentProfile = props.studentProfile
  let educationDetails = studentProfile.educationDetails[0] || {}
  let image_path = `http://localhost:3001/images/profile_pics/${studentProfile.userId}.png`
  return(
    <div class="style__content___IR0nx" data-hook="identity-card" id="profilePicture">
      <div class="style__student-info___33_AR">
        <div class="style__flex___fCvpa style__align-center___GzLZc style__column___1Ye52">
          <div class="style__user-avatar___2KxEV">
            <div class="style__avatar___2JuVa style__avatar-color-blue___2JSG2 style__avatar-extra-large___e7Tg9 style__avatar-round___3RzuF"><img class='style__avatar-image___2LV5H' src={image_path}/></div>
          </div>
  <h1 class="style__heading___29i1Z style__huge___YeESj style__fitted___3L0Tr">{studentProfile.firstName} {studentProfile.lastName}</h1>
  <div class="style__text___2ilXR style__large___3qwwG style__fitted___1GslH style__semibold___3bkz0 style__center___ihjch">{studentProfile.currentCollegeName}</div>
          <div class="style__text___2ilXR style__large___3qwwG style__fitted___1GslH style__semibold___3bkz0 style__center___ihjch">{educationDetails.degree}, {educationDetails.major}</div>
  <div class="style__text___2ilXR style__large___3qwwG style__fitted___1GslH style__muted___2z7cM style__center___ihjch">Year of Passing {educationDetails.yearOfPassing}</div>
        </div>
      </div>
    </div>
  )
}