const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');
let {CompanyProfileType,
    EducationDetailType,
    EventRegistrationType,
  EventType,
  ExperienceDetailType,
  JobApplicationType,
  JobPostingType,
  StudentProfileType,
  UserType,
  UserSessionInfoType,
} = require('./../objectTypes');
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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root Query',
  fields: {
    signin: {
        type: UserSessionInfoType,
        args: {
            emailId: { type: GraphQLString},
            password: { type: GraphQLString},
        },
        async resolve(_,args){
            let user = await User.findOne({emailId: args.emailId});
            let error = 'Invalid email id or password';
            if (!user || !user.is_password_valid(args.password)){
                return null
            }
            let profile = await eval(user.role + 'Profile').findOne({user: user._id});
                let sessionStorageInfo = {
                id: user.id,
                type: user.role,
                profile: profile
                };
            return sessionStorageInfo
        }
    },
    companyProfile: {
        type: CompanyProfileType,
        args: {id: { type: GraphQLID } },
        async resolve(_,args) {
            return await CompanyProfile.findById(args.id);
        }
    },
    educationDetail: {
        type: EducationDetailType,
        args: {id: { type: GraphQLID } },
        async resolve(_,args) {
            return await EducationDetail.findById(args.id);
        }

    },
    event: {
        type: EventType,
        args: {id: { type: GraphQLID } },
        async resolve(_,args) {
            return await Event.findById(args.id);
        }

    },
    experienceDetail: {
        type: ExperienceDetailType,
        args: {id: { type: GraphQLID } },
        async resolve(_,args) {
            return await ExperienceDetail.findById(args.id);
        }

    },
    eventRegistration: {
        type: EventRegistrationType,
        args: {id: { type: GraphQLID } },
        async resolve(_,args) {
            return await EventRegistration.findById(args.id);
        }

    },
    jobApplication: {
        type: JobApplicationType,
        args: {id: { type: GraphQLID } },
        async resolve(_,args) {
            return await JobApplication.findById(args.id);
        }

    },
    jobPosting: {
        type: JobPostingType,
        args: {id: { type: GraphQLID } },
        async resolve(_,args) {
            return await JobPosting.findById(args.id);
        }

    },
    studentProfile: {
        type: StudentProfileType,
        args: {id: { type: GraphQLID } },
        async resolve(_,args) {
            return await StudentProfile.findById(args.id);
        }

    },
    user: {
        type: UserType,
        args: {id: { type: GraphQLID } },
        async resolve(_,args) {
            return await User.findById(args.id);
        }

    },
    companyProfiles: {
        type:  new GraphQLList(CompanyProfileType),
        async resolve(_,args){
            return await CompanyProfile.find();
        }
    },
    educationDetails: {
        type:  new GraphQLList(EducationDetailType),
        async resolve(_,args){
            return await EducationDetail.find();
        }
    },
    events: {
        type:  new GraphQLList(EventType),
        async resolve(_,args){
            return await Event.find();
        }
    },
    eventRegistrations: {
        type:  new GraphQLList(EventRegistrationType),
        async resolve(_,args){
            return await EventRegistration.find();
        }
    },
    experienceDetails: {
        type:  new GraphQLList(ExperienceDetailType),
        async resolve(_,args){
            return await ExperienceDetail.find();
        }
    },
    jobApplications: {
        type:  new GraphQLList(JobApplicationType),
        args:{
            jobPosting: { type: GraphQLID},
            studentProfile: {type: GraphQLID}
        },
        async resolve(_,args){
            let query = {};
            args.jobPosting && (query.jobPosting = args.jobPosting);
            args.studentProfile && (query.studentProfile = args.studentProfile);
            return await JobApplication.find(query);
        }
    },
    jobPostings: {
        type:  new GraphQLList(JobPostingType),
        args: {
            companyProfileId: { type: GraphQLID },
            jobTitle: { type: GraphQLString },
            companyName: { type: GraphQLString },
        },
        async resolve(_,args){
            let query = {};
            args.companyProfileId && (query.companyProfile = args.companyProfileId);
            args.jobTitle && (query.jobTitle = args.jobTitle);
            if(args.companyName){
                let compayProfileIds = await CompanyProfile.find({ name: args.companyName }).select('_id');
                query.companyProfile && compayProfileIds.push(query.companyProfile)
                compayProfileIds.length > 0 && (query.companyProfile = {$in: compayProfileIds}); 
            }
            return await JobPosting.find(query);
        }
    },
    studentProfiles: {
        type:  new GraphQLList(StudentProfileType),
        args: {
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            currentCollegeName: { type: GraphQLString },
        },
        async resolve(_,args){
            let query ={};
            args.firstName && (query.firstName = args.firstName);
            args.lastName && (query.lastName = args.lastName);
            args.currentCollegeName && (query.currentCollegeName = args.currentCollegeName);
            return await StudentProfile.find(query);
        }
    },
    users: {
        type:  new GraphQLList(UserType),
        async resolve(_,args){
            return await User.find();
        }
    },
  }
});

module.exports = RootQuery;