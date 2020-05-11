import { gql } from 'apollo-boost';

const JobApplications = gql `
  query JobApplications(
    $jobPosting: ID,
    $studentProfile: ID,
  ){
    jobApplications(
      jobPosting: $jobPosting,
      studentProfile: $studentProfile,
    ){
      resumePath,
      status,
      studentProfile{
        id
      }
    }
  }
`;

export {JobApplications};