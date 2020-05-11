'use strict';

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean,
  GraphQLUnionType,
  GraphQLInputObjectType,
} = require('graphql');

let mongoose = require('mongoose');
let {
  CompanyProfile,
  EducationDetail,
  EventRegistration,
  Event,
  ExperienceDetail,
  JobApplication,
  JobPosting,
  StudentProfile,
  User
} = mongoose.models;

let CompanyProfileType = new GraphQLObjectType({
  name: 'CompanyProfile',
  fields: () => ({
    id: { type: GraphQLID },
    name: {
      type: GraphQLString,
    },
    location: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString
    },
    contactInformation: {
      type: GraphQLString
    },
    jobPostings: {
      type: new GraphQLList(JobPostingType),
      async resolve(parent, _){
        return await JobPosting.find({_id: {$in: parent.jobPostings}})
      }
    },
    events: {
      type: new GraphQLList(EventType),
      async resolve(parent, _){
        return await Event.find({_id: {$in: parent.events}})
      }
    },
    user: {
      type: UserType,
      async resolve(parent, _){
        return await User.findOne({_id: parent.user.toString()});
      }
    },
  })
});
  
let EducationDetailType = new GraphQLObjectType({
  name: 'EducationDetail',
  fields: () => ({
    id: { type: GraphQLID },
    collegeName: {
      type: GraphQLString,
    },
    collegeLocation: {
      type: GraphQLString,
    },
    degree: {
      type: GraphQLString,
    },
    major: {
      type: GraphQLString,
    },
    yearOfPassing: {
      type: GraphQLInt,
    },
    currentCgpa: {
      type: GraphQLFloat,
    },
    highestDegree: {
      type: GraphQLBoolean,
    },
    studentProfile: {
      type: StudentProfileType,
      async resolve(parent,_){
        return await StudentProfile.findOne({_id: parent.studentProfile});
      } 
    },
  })
});

let EventRegistrationType = new GraphQLObjectType({
  name: 'EventRegistration',
  fields: () => ({
    id: { type: GraphQLID },
    event: {
      type: EventType,
      async resolve(parent,_){
        return await Event.findById(parent.event);
      }
    },
    studentProfile: {
      type: StudentProfileType,
      async resolve(parent,_){
        return await StudentProfile.findOne(parent.studentProfile);
      }
    }
  })
});

let EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: { type: GraphQLID },
    eventName: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    readableTime: {
      type: GraphQLString,
    },
    location: {
      type: GraphQLString,
    },
    eligibility: {
      type: GraphQLString,
    },
    companyProfile: {
      type: CompanyProfileType,
      async resolve(parent,_){
        return await CompanyProfile.findById(parent.companyProfile);
      }
    },
    eventRegistrations: {
        type: GraphQLList(EventRegistrationType),
        async resolve(parent,_){
          return await EventRegistration.find({_id: {$in: parent.eventRegistrations}});
        }
      },
  })
});

let ExperienceDetailType = new GraphQLObjectType({
  name: 'ExperienceDetail',
  fields: () => ({
    id: { type: GraphQLID },
    companyName: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    companyLocation: {
      type: GraphQLString,
    },
    readableStartDate: {
      type: GraphQLString,
    },
    readableEndDate: {
      type: GraphQLString,
    },
    workDescription: {
      type: GraphQLString,
    },
    studentProfile: {
      type: StudentProfileType,
      async resolve(parent,_){
        return await StudentProfile.findOne(parent.studentProfile);
      }
    },
  })
});

let JobApplicationType = new GraphQLObjectType({
  name: 'JobApplication',
  fields: () => ({
    id: { type: GraphQLID },
    resumePath: {
      type: GraphQLString,
    },
    status: {
      type: GraphQLString,
    },
    studentProfile: {
      type: StudentProfileType,
      async resolve(parent,_){
        return await StudentProfile.findOne(parent.studentProfile);
      }
    },
    jobPosting: {
      type: JobPostingType,
      async resolve(parent, _){
        return await JobPosting.findById(parent.jobPosting);
      }
    },
    createdAt: {
      type: GraphQLString,
      resolve(parent, _){
        return new Date(parent.createdAt).toLocaleString('en-US', { dateStyle: 'full' })
      }
    }
  })
});

let JobPostingType = new GraphQLObjectType({
  name: 'JobPosting',
  fields: () => ({
    id: { type: GraphQLID },
    jobTitle: {
      type: GraphQLString,
    },
    readableDeadline: {
      type: GraphQLString,
    },
    location: {
      type: GraphQLString,
    },
    salary: {
      type: GraphQLString,
    },
    jobDescription: {
      type: GraphQLString,
    },
    jobCategory: {
      type: GraphQLString,
    },
    companyProfile: {
      type: CompanyProfileType,
      async resolve(parent,_){
        return await CompanyProfile.findById(parent.companyProfile);
      }
    },
    jobApplications: {
      type: new GraphQLList(JobApplicationType),
      async resolve(parent,_){
        return await JobApplication.find({_id: {$in: parent.jobApplications}});
      }
    },
  })
});

let StudentProfileType = new GraphQLObjectType({
  name: 'StudentProfile',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    currentCollegeName: {
      type: GraphQLString,
    },
    city:{
      type: GraphQLString
    },
    state:{
      type: GraphQLString
    },
    country:{
      type: GraphQLString
    },
    skillSet:{
      type: GraphQLString
    },
    careerObjective:{
      type: GraphQLString
    },
    phoneNumber:{
      type: GraphQLString
    },
    user: {
      type: UserType,
      async resolve(parent, _){
        return await User.findOne({_id: parent.user.toString()});
      }
    },
    educationDetails: {
      type: new GraphQLList(EducationDetailType),
      async resolve(parent,_){
        return await EducationDetail.find({_id: {$in: parent.educationDetails}});
      }
    },
    experienceDetails: {
      type: new GraphQLList(ExperienceDetailType),
      async resolve(parent,_){
        return await ExperienceDetail.find({_id: {$in: parent.experienceDetails}});
      }
    },
    jobApplications: {
      type: new GraphQLList(JobApplicationType),
      async resolve(parent,_){
        return await JobApplication.find({_id: {$in: parent.jobApplications}});
      }
    },
  })
});

let UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    emailId: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    salt: {
      type: GraphQLString
    },
    role: {
      type: GraphQLString,
    },
  })
});


let ProfileType = new GraphQLUnionType({
  name: 'Profile',
  types: [ StudentProfileType ,CompanyProfileType],
  resolveType(value) {
    if (value instanceof StudentProfile) {
      return StudentProfileType;
    }
    if (value instanceof CompanyProfile) {
      return CompanyProfileType;
    }
  }
});

let UserSessionInfoType = new GraphQLObjectType({
  name: 'UserSessionInfo',
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    profile: { type: ProfileType }
  })
})

let EducationDetailInputType = new GraphQLInputObjectType({
  name: "EducationDetailInput",
  fields: {
    id: { type: GraphQLID },
    collegeName: { type: GraphQLString },
    collegeLocation: { type: GraphQLString },
    degree: { type: GraphQLString },
    major: { type: GraphQLString },
    yearOfPassing: { type: GraphQLInt },
    currentCgpa: { type: GraphQLFloat },
    highestDegree: { type: GraphQLBoolean },
  }
})

let ExperienceDetailInputType = new GraphQLInputObjectType({
  name: "ExperienceDetailInput",
  fields: {
    id: { type: GraphQLID },
    companyName: { type: GraphQLString },
    title: { type: GraphQLString },
    companyLocation: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    workDescription: { type: GraphQLString },
  }
})

let StudentBasicProfileInputType = new GraphQLInputObjectType({
  name: "StudentBasicProfileInput",
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    currentCollegeName: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    careerObjective: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    skillSet: { type: GraphQLString },
    dob: { type: GraphQLString },
  }
});

let StudentProfileInputType = new GraphQLInputObjectType({
  name: "StudentProfileInput",
  fields: {
    basicDetails: {type: StudentBasicProfileInputType},
    educationDetails: {type: EducationDetailInputType},
    experienceDetails: {type: ExperienceDetailInputType},
  }
})

module.exports = {CompanyProfileType,
  EducationDetailType,
  EventRegistrationType,
  EventType,
  ExperienceDetailType,
  JobApplicationType,
  JobPostingType,
  StudentProfileType,
  UserType,
  UserSessionInfoType,
  StudentProfileInputType,
  EducationDetailInputType,
  ExperienceDetailInputType
}
