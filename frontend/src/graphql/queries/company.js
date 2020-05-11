import {gql} from 'apollo-boost';

const CompanyProfileQuery = gql `
  query CompanyProfileQuery(
    $id: ID
  ){
    companyProfile(id: $id){
      id,
      name,
      location,
      description,
      contactInformation,
      user{
        id
      }
    }
  }
`;

export {CompanyProfileQuery};