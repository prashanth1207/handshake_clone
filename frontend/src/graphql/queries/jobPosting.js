import { gql } from 'apollo-boost';

const JobPostings = gql `
  query JobPostings(
    $companyProfileId: ID,
    $jobTitle: String,
    $companyName: String,
  ){
    jobPostings(
      companyProfileId: $companyProfileId,
      jobTitle: $jobTitle,
      companyName: $companyName,
    ){
      id,
      jobTitle,
      readableDeadline,
      location,
      salary,
      jobDescription,
      jobCategory,
      companyProfile{
        id,
        name,
        location,
        description,
        contactInformation,
        user{
          id
        }
      }
      jobApplications{
        resumePath,
        status,
        studentProfile{
          id,
          firstName,
          lastName,
          currentCollegeName,
          city,
          state,
          country,
          skillSet,
          careerObjective,
          phoneNumber,
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

const JobPostingQuery = gql`
  query JobPostingQuery($id: ID){
    jobPosting(id: $id){
      id,
      jobTitle,
      readableDeadline,
      location,
      salary,
      jobDescription,
      jobCategory,
      companyProfile{
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
  }
`;

export {JobPostings, JobPostingQuery};