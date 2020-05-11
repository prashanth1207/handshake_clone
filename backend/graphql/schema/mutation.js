const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
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
  StudentProfileInputType
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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register: {
      type: UserSessionInfoType,
      args: {
        emailId: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        currentCollegeName: { type: GraphQLString },
      },
      async resolve(_,args) {
        let userData = {};
        userData.emailId = args.emailId;
        userData.password = args.password;
        userData.role = args.role;
        let profileData = {};
        if(userData.role === 'Student'){
          profileData.firstName = args.firstName;
          profileData.lastName = args.lastName;
          profileData.currentCollegeName = args.currentCollegeName;
        } else {
          profileData.name = args.name;
          profileData.location = args.location;
        }
        let user = await User.findOne({emailId: userData.emailId});
        if(user){
          return null;
        }
        const session = await mongoose.startSession();
        session.startTransaction();
        try{
          let user = new User(userData)
          await user.save(session);
          let profileKlass = eval(user.role + 'Profile');
          let profile = new profileKlass(Object.assign({},profileData,{user: user._id}));
          await profile.save(session);
          let sessionStorageInfo = {
            id: user._id,
            type: user.role,
            profile: profile
          };
          await session.commitTransaction();
          session.endSession();
          return sessionStorageInfo
        } catch(err) {
          await session.abortTransaction();
          session.endSession();
          return null
        };
      }
    },
    updateCompanyProfile: {
      type: CompanyProfileType,
      args: {
        id: {type: GraphQLID},
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      async resolve(_,args){
        profile = await CompanyProfile.findById(args.id);
        profile.name = args.name;
        profile.location = args.location;
        profile.description = args.description;
        await profile.save();
        return profile;
      }
    },
    createJobPosting: {
      type: JobPostingType,
      args: {
        jobTitle: { type: GraphQLString },
        postingDate: { type: GraphQLString },
        applicationDeadline: { type: GraphQLString },
        location: { type: GraphQLString },
        salary: { type: GraphQLString },
        jobDescription: { type: GraphQLString },
        jobCategory: { type: GraphQLString },
        companyProfile: { type: GraphQLID },
      },
      async resolve(_, args) {
        let jobPosting = new JobPosting(args);
        return await jobPosting.save()
        .then(async (job_posting) =>{
          let companyProfile = await CompanyProfile.findById(args.companyProfile);
          companyProfile.jobPostings.push(job_posting._id);
          await companyProfile.save();
          return job_posting;
        })
      }
    },
    updateStudentProfile: {
      type: StudentProfileType,
      args:  {
        input: {
          type: new GraphQLNonNull(StudentProfileInputType),
        }
      },
      async resolve(_,args){
        let id = args.id;
        let studentProfile = await StudentProfile.findById(id);
        if(studentProfile){
          try{
            let educationDetailsData = args.educationDetails;
            if(educationDetailsData){
              educationDetailsData.studentProfile = id;
              await EducationDetail.createOrUpdate(educationDetailsData,{where: {studentProfile: id}});
            }
            let experienceDetailsData = args.experienceDetails;
            if(experienceDetailsData){
              experienceDetailsData.studentProfile = id;
              await ExperienceDetail.createOrUpdate(experienceDetailsData,{where: {studentProfile: id}});
            }
            let studentProfileData = args.basicDetails;
            if(studentProfileData){
              await studentProfile.update(studentProfileData);
            }
            return res.json({success: true})
          }catch(error){
            res.json({
              success: false,
              error: error.message
            })
          }
        }else{
          res.status(404)
            .json({error: 'Record not found'});
        }
      }
    },
    applyForJobPosting:{
      type: JobApplicationType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        status: {type: new GraphQLNonNull(GraphQLString)},
      },
      async resolve(_,args){
        let jobApplication = await JobApplication.findById(args.id);
        if(jobApplication){
          jobApplication.status = args.status;
          jobApplication.save().then(applicaton =>{
            return applicaton
          })
        }else{
          return null
        }
      }
    }
  }
});

module.exports = Mutation;