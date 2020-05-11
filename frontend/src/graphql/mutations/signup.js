import { gql } from 'apollo-boost';

const StudentSignup = gql `
  mutation studentSignup(
    $emailId: String,
    $password: String,
    $role: String,
    $name: String,
    $location: String,
    $firstName: String,
    $lastName: String,
    $currentCollegeName: String,
    ){
    register(
      emailId: $emailId,
      password: $password,
      role: $role,
      name: $name,
      location: $location,
      firstName: $firstName,
      lastName: $lastName,
      currentCollegeName: $currentCollegeName,
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

const CompanySignup = gql `
  mutation companySignup(
    $emailId: String,
    $password: String,
    $role: String,
    $name: String,
    $location: String,
    $firstName: String,
    $lastName: String,
    $currentCollegeName: String,
  ){
    register(
      emailId: $emailId,
      password: $password,
      role: $role,
      name: $name,
      location: $location,
      firstName: $firstName,
      lastName: $lastName,
      currentCollegeName: $currentCollegeName,
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

export {StudentSignup, CompanySignup};