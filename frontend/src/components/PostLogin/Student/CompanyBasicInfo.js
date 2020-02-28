import React from 'react';

export default function CompanyBasicInfo(props){
  let companyProfile=props.companyProfile;
  return(
    <div class="style__cover___EcB_L style__card___1rhof" data-hook="card">
      <div>
        <div class="style__card-item___B1f7m">
          <div data-hook="employers-show-cover-content" class="style__content___2Xq3C style__employers-show-cover-content___O51-w">
            <div class="style__media___2RgOB">
              <div class="style__avatar___10taQ style__media-avatar___1vwlF">
                <a aria-label="Silicon Spectra" href="/employers/88539" title="Silicon Spectra" class="style__link___3QEM8">
                  <div class="style__avatar___2JuVa style__avatar-color-red___2pJ92 style__avatar-bordered___2TTCd style__avatar-large___2vOrM">
                    <img src={`http://localhost:3001/images/profile_pics/${companyProfile.userId}.png`} class="style__avatar-image___2LV5H"></img>
                  </div>
                </a>
              </div>
              <div class="style__body___6az1_ style__media-body___1QdtR">
                <div class="style__text-desc___2zH7K">
                  <div class="style__spacing-sm-bottom___XqamY">
                    <h1 class="style__heading___29i1Z style__huge___YeESj style__fitted___3L0Tr">
                      {companyProfile.name}
                    </h1>
                  </div>
                  <div class="style__details___2BNYt">
                    <div class="style__list-with-tooltip___2c5rW" title={companyProfile.location}>
                      {companyProfile.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}