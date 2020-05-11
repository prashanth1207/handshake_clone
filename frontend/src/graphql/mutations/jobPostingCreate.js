import {gql} from 'apollo-boost';

const CreateJobPosting = gql `
  mutation CreateJobPosting(
    $jobTitle: String!,
    $postingDate: String!,
    $applicationDeadline: String!,
    $location: String!,
    $salary: String!,
    $jobDescription: String!,
    $jobCategory: String!,
    $companyProfile: ID!,
  ){
    createJobPosting(
      jobTitle: $jobTitle,
      postingDate: $postingDate,
      applicationDeadline: $applicationDeadline,
      location: $location,
      salary: $salary,
      jobDescription: $jobDescription,
      jobCategory: $jobCategory,
      companyProfile: $companyProfile,
    ){
      jobTitle
      location
      salary
      jobDescription
      jobCategory
    }
  }
`;

export {CreateJobPosting}