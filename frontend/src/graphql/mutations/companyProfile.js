import {gql} from 'apollo-boost';

const updateCompanyProfile = gql `
  mutation updateCompanyProfile(
    $name: String!,
    $location: String!,
    $description: String!,
    $contactInformation: String!
  ){
    name
    location
    description
    contactInformation
  }
`;

export {updateCompanyProfile}