import React from 'react';

export default function CompanyContactInformation(props){
  return(
    <div data-hook="col" class="style__col___3BbK4 style__col-md-4___3OT_U">
      <div class="style__card___1rhof" data-hook="card">
        <div class="style__card-item___B1f7m style__large___Kv76x">
          <h2 class="style__heading___29i1Z style__extra-large___PY8Kd">Contact Information</h2>
          <div>
            <div class="style__content___3RjbM">
              <div>
                <span class="style__formatted___2u1nG">
                  <span class="Linkify">
                    <div class="style__text___2ilXR style__large___3qwwG">
                      {props.companyProfile.contactInformation}
                    </div>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}