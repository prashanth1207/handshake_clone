import React from 'react';

function JobPostingSummary(props) {
  let jobPosting = props.jobPosting;
  let jobCategory = (jobPosting.jobCategory || '').split(',').join(' ');
  let job_title = jobPosting.jobTitle;
  if(props.linkJobTitle){
    job_title = <a href={`/student/job_postings/${jobPosting.id}`}>{job_title}</a>
  }
  return (
    <div class="style__cover___1IgXo">
        <div class="style__cover___EcB_L style__card___1rhof" >
          <div class="style__card-item___B1f7m style__large___Kv76x">
            <div class="style__media___2RgOB">
              <div class="style__avatar___2NvVt style__media-avatar___1vwlF">
                <a aria-label="Silicon Spectra" href={`/student/company_profile/${jobPosting.companyProfileId}`} title="Silicon Spectra" class="style__link___3QEM8">
                  <div class="style__avatar___2JuVa style__avatar-color-red___2pJ92 style__avatar-bordered___2TTCd style__avatar-large___2vOrM">
                    <img class="style__avatar-image___2LV5H" src={`http://localhost:3001/images/profile_pics/${jobPosting.companyProfile.userId}.png`}></img>
                  </div>
                </a>
              </div>
              <div class="style__media-body___1QdtR">
                <div class="style__heading-group___3uRpr">
                  <h1 class="style__heading___1yDcF style__heading___29i1Z style__huge___YeESj">
                    <div class="style__flex___fCvpa style__justify-space-between___F3m5J">
  <div class="style__flex-item___2eWZ4">{job_title}</div>
                    </div>
                  </h1>
  <h2 class="style__heading___29i1Z style__large___15W-p"><a href={`/student/company_profile/${jobPosting.companyProfileId}`}>{jobPosting.companyProfile.name}</a></h2>
                </div>
                <div class="style__feature-group___3nwCu">
                  <div class="style__feature-group-item___2fiTu">
                    <svg aria-hidden="true" data-prefix="fas" data-icon="map-marker-alt" class="svg-inline--fa fa-map-marker-alt fa-w-12 icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                      <path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path>
                    </svg>
  <div title="Milpitas, California, United States of America" class="style__list-with-tooltip___2c5rW">{jobPosting.companyProfile.location}</div>
                  </div>
                  <div class="style__feature-group-item___2fiTu" title="Full-Time Job" >
                    <svg aria-hidden="true" data-prefix="fas" data-icon="briefcase" class="svg-inline--fa fa-briefcase fa-w-16 icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="currentColor" d="M320 336c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c25.6 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-25.6 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z"></path>
                    </svg>
                    {jobCategory}
                  </div>
                  <div class="style__feature-group-item___2fiTu" >
                    <svg aria-hidden="true" data-prefix="far" data-icon="money-bill-alt" class="svg-inline--fa fa-money-bill-alt fa-w-20 icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                      <path fill="currentColor" d="M320 144c-53.02 0-96 50.14-96 112 0 61.85 42.98 112 96 112 53 0 96-50.13 96-112 0-61.86-42.98-112-96-112zm40 168c0 4.42-3.58 8-8 8h-64c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h16v-55.44l-.47.31a7.992 7.992 0 0 1-11.09-2.22l-8.88-13.31a7.992 7.992 0 0 1 2.22-11.09l15.33-10.22a23.99 23.99 0 0 1 13.31-4.03H328c4.42 0 8 3.58 8 8v88h16c4.42 0 8 3.58 8 8v16zM608 64H32C14.33 64 0 78.33 0 96v320c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V96c0-17.67-14.33-32-32-32zm-16 272c-35.35 0-64 28.65-64 64H112c0-35.35-28.65-64-64-64V176c35.35 0 64-28.65 64-64h416c0 35.35 28.65 64 64 64v160z"></path>
                    </svg>
                    {jobPosting.salary}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default JobPostingSummary;