import React from 'react';

export default function WorkExperience(props){
  let experienceDetails = props.experienceDetails;
  return(
    <div class="style__card___1rhof" data-hook="work-experience-card">
      <div class="style__card-item___B1f7m style__large___Kv76x">
        <h2 class="style__heading___29i1Z style__large___15W-p style__fitted___3L0Tr" id="experienceDetailss">Work Experience</h2>
      </div>
      <div class="style__card-item___B1f7m style__large___Kv76x">
        <div class="style__flex___fCvpa">
          <div class="style__media-body___1QdtR">
            <div class="style__flex___fCvpa style__justify-space-between___F3m5J">
              <div class="style__heading-group___3uRpr">
  <h2 class="style__heading___29i1Z style__large___15W-p style__fitted___3L0Tr">{experienceDetails.companyName}</h2>
                <div class="style__text___2ilXR style__large___3qwwG style__fitted___1GslH">{experienceDetails.title}</div>
              </div>
            </div>
          </div>
          <p class="student-profile-card__content-tertiary-title student-profile-card__content-has-date"><span>{experienceDetails.readableStartDate} - {experienceDetails.readableEndDate}</span><span class="student-profile-card__content-location">{experienceDetails.location}</span></p>
  <div class="style__text___2ilXR"><span class="style__formatted___2u1nG">{experienceDetails.workDescription}</span></div>
        </div>
      </div>
    </div>

  )
}