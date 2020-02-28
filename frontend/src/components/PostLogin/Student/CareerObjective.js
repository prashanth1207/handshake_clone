import React from 'react';

export default function CareerObjective(props){
  return(
    <div class="style__card___1rhof" data-hook="bio">
      <div class="style__card-item___B1f7m style__large___Kv76x">
        <div class="style__flex___fCvpa style__justify-space-between___F3m5J">
          <h2 class="style__heading___29i1Z style__large___15W-p" id="journey">My Journey</h2>
        </div>
  <div class="style__bio___3F6vT"><span class="style__formatted___2u1nG">{props.studentProfile.careerObjective}</span></div>
      </div>
    </div>
  )
}