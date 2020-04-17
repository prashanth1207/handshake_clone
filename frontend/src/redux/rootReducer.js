import { combineReducers } from 'redux';
import { entryReducer } from './entry/entryReducer';
import { studentProfilesReducer } from './studentProfiles/studentProfilesReducer';
import { eventReducer } from './event/eventReducer';
import { companyProfileReducer } from './companyProfile/companyProfileReducer';
import {companyJobReducer} from './companyJob/companyJobReducer'
import {studentJobApplicationsReducer} from './studentJobApplications/studentJobApplicationsReducer'
import {studentJobsReducer} from './studentJobs/studentJobsReducer'
import {jobPostingReducer} from './jobPosting/jobPostingReducer'
import {messageReducer} from './message/messageReducer'
import {studentProfileReducer} from './studentProfile/studentProfileReducer'

const rootReducer = combineReducers({
  user: entryReducer,
  studentProfiles: studentProfilesReducer,
  event: eventReducer,
  companyProfile: companyProfileReducer,
  companyJob: companyJobReducer,
  studentJobApplications: studentJobApplicationsReducer,
  studentJobs: studentJobsReducer,
  jobPosting: jobPostingReducer,
  message: messageReducer,
  studentProfile: studentProfileReducer,
});

export default rootReducer;