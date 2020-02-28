import React from 'react';

export default function EducationDetails(props){
  let educationDetails = props.educationDetails
  return(
    <div class="style__card___1rhof" data-hook="education-card">
      <div class="style__card-item___B1f7m style__large___Kv76x">
        <h2 class="style__heading___29i1Z style__large___15W-p style__fitted___3L0Tr" id="primaryEducation">Education</h2>
      </div>
      <div class="style__card-item___B1f7m style__large___Kv76x">
        <div class="style__flex___fCvpa">
          <div class="style__media-body___1QdtR">
            <div class="style__flex___fCvpa style__justify-space-between___F3m5J">
              <div class="style__heading-group___3uRpr">
                <h2 class="style__heading___29i1Z style__large___15W-p style__fitted___3L0Tr">{educationDetails.collegeName} <span class="style__tag___JUqHD style__fitted___3lmQj" title="primary education" data-hook="tag"><span class="style__content___2INbm"><span class="style__children___1bmK9">primary education</span></span></span></h2>
  <div class="style__text___2ilXR style__large___3qwwG">{educationDetails.degree}, {educationDetails.location}, CGPA : {educationDetails.currentCgpa}</div>
              </div>
            </div>
          </div>
          <section class="student-education__details">
            <span class="student-profile-card__content-tertiary-title">
              <div class="style__text___2ilXR style__small___1Nyai style__fitted___1GslH">{educationDetails.yearOfPassing}</div>
            </span>
            <div><span class="student-profile-card__details-label">Major in</span> {educationDetails.major}</div>
          </section>
        </div>
      </div>
    </div>

  )
}