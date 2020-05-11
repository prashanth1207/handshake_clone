import {gql} from 'apollo-boost';

const updateStudentProfile = gql `
  mutation updateStudentProfile(
    $firstName: String!,
    $lastName: String!,
    $currentCollegeName: String!,
  ){
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
`;

export {updateStudentProfile}