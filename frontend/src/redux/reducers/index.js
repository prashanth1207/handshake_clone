import { combineReducers } from 'redux';
import { entryReducer } from './../entry/entryReducer';
import { studentProfilesReducer } from './../studentProfiles/studentProfilesReducer';
import { eventReducer } from './../event/eventReducer';
import { companyProfileReducer } from './../companyProfile/companyProfileReducer';

const rootReducer = combineReducers({
  user: entryReducer,
  studentProfiles: studentProfilesReducer,
  event: eventReducer,
  companyProfile: companyProfileReducer
});

export default rootReducer;