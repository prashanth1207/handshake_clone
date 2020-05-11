import {gql} from 'apollo-boost';

const StudentProfiles = gql`
  query StudentProfiles(
    $firstName: String!,
    $lastName: String!,
    $currentCollegeName: String!,
  ){
    studentProfiles(
      firstName: $firstName,
      lastName: $lastName,
      currentCollegeName: $currentCollegeName,
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
  }
`;

const StudentQuery = gql `
  query StudentQuery(
    $id: ID
  ){
    studentProfile(id: $id){
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
      user{
        id
      }
    }
  }
`;

export {StudentProfiles, StudentQuery};