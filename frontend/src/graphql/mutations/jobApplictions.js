import {gql} from 'apollo-boost';

const JobApplicationCreate = gql `
  mutation JobApplicationCreate(
    $id: ID!,
    $status: String!,
  ){
    applyForJobPosting(
      id: $id,
      status: $status,
    ){
      jobTitle
      location
      salary
      jobDescription
      jobCategory
    }
  }
`;

export {JobApplicationCreate}