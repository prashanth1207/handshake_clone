import { gql } from 'apollo-boost';

const SiginInStudent = gql `
  query SiginIn($emailId: String!,$password: String!){
    signin(
      emailId: $emailId,
      password: $password,
    ){
      id,
      type,
      profile{
        ... on StudentProfile{
          id
          firstName
          lastName
          currentCollegeName
          city
          state
          country
          skillSet
          careerObjective
          phoneNumber
          educationDetails {
            id
            collegeName
            collegeLocation
            degree
            major
            yearOfPassing
            currentCgpa
            highestDegree
          }
          experienceDetails {
            id
            companyName
            title
            companyLocation
            readableStartDate
            readableEndDate
            workDescription
          }
        }
      }
    }
  }
`;

const SiginInCompany = gql `
  query SiginIn($emailId: String!,$password: String!){
    signin(
      emailId: $emailId,
      password: $password,
    ){
      id,
      type,
      profile{
        ... on CompanyProfile{
          id,
          name,
          location,
          description,
          contactInformation
        }
      }
    }
  }
`;

export {SiginInStudent, SiginInCompany};