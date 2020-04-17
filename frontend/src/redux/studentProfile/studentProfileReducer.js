import {
  STUDENT_PROFILE_SHOW,
  STUDENT_PROFILE_EDIT,
  STUDENT_PROFILE_PIC_UPDATE,
  STUDENT_PROFILE_PIC_UPDATE_ERROR,
  EXPERIENCE_DETAIL_EDIT,
  EXPERIENCE_DETAIL_CLICK_EDIT,
  EXPERIENCE_DETAIL_DELETE,
  EDUCATION_DETAIL_EDIT,
  EDUCATION_DETAIL_CLICK_EDIT,
  EDUCATION_DETAIL_DELETE
} from '../action-types';

const initalState = {
  studentProfile: { 
    status: 'loading',
    studentProfile: null 
  },
  profilePic: {
    success: null,
    error: null
  },
  profileSubmitSuccess: false,
}

export function studentProfileReducer(state=initalState,action){
  switch(action.type){
    case STUDENT_PROFILE_SHOW:
      return {
        ...state,
        studentProfile: action.payload,
        profileSubmitSuccess: false,
      }
    case STUDENT_PROFILE_EDIT:
      return {
        ...state,
        studentProfile: { 
          status: 'loaded',
          studentProfile: action.payload
        },
        profileSubmitSuccess: true,
      }
    case STUDENT_PROFILE_PIC_UPDATE:
      return {
        ...state,
        profilePic: {
          success: true,
          error: null
        },
        profileSubmitSuccess: true,
      }
    case STUDENT_PROFILE_PIC_UPDATE_ERROR:
      return {
        ...state,
        profilePic: {
          success: false,
          error: action.payload
        }
      }
    case EDUCATION_DETAIL_EDIT:
      let studentProfileEdit = Object.assign({},state.studentProfile.studentProfile);
      let index = studentProfileEdit.educationDetails.findIndex(educationDetail =>{
        if(educationDetail._id == action.payload._id){
          return true
        }
      })
      if(index == -1){
        studentProfileEdit.educationDetails.push(action.payload);
      }else{
        studentProfileEdit.educationDetails[index] = action.payload;
      }
      return {
        ...state,
        studentProfile: { 
          status: 'loaded',
          studentProfile: studentProfileEdit
        },
      }
    case EDUCATION_DETAIL_CLICK_EDIT:
      let studentProfileClickEdit = Object.assign({},state.studentProfile.studentProfile);
      let index_click = studentProfileClickEdit.educationDetails.findIndex(educationDetail =>{
        if(educationDetail._id == action.payload){
          return true
        }
      })
      studentProfileClickEdit.educationDetails[index_click].status = 'edit';
      return {
        ...state,
        studentProfile: { 
          status: 'loaded',
          studentProfile: studentProfileClickEdit
        },
      }
    case EDUCATION_DETAIL_DELETE:
      let studentProfileDelete = Object.assign({},state.studentProfile);
      studentProfileDelete.studentProfile.educationDetails = studentProfileDelete.educationDetails.filter(educationDetail =>{
        if(educationDetail._id == action.payload){
          return false;
        }
        return true
      })
      return {
        ...state,
        studentProfile: studentProfileDelete
      }
    case EXPERIENCE_DETAIL_EDIT:
      let expstudentProfileEdit = Object.assign({},state.studentProfile.studentProfile);
      let expindex = expstudentProfileEdit.experienceDetails.findIndex(experienceDetail =>{
        if(experienceDetail._id == action.payload._id){
          return true
        }
      })
      if(expindex == -1){
        expstudentProfileEdit.experienceDetails.push(action.payload);
      }else{
        expstudentProfileEdit.experienceDetails[expindex] = action.payload;
      }
      return {
        ...state,
        studentProfile: { 
          status: 'loaded',
          studentProfile: expstudentProfileEdit
        },
      }
    case EXPERIENCE_DETAIL_CLICK_EDIT:
      let expstudentProfileClickEdit = Object.assign({},state.studentProfile.studentProfile);
      let expindex_click = expstudentProfileClickEdit.experienceDetails.findIndex(experienceDetail =>{
        if(experienceDetail._id == action.payload){
          return true
        }
      })
      expstudentProfileClickEdit.experienceDetails[expindex_click].status = 'edit';
      return {
        ...state,
        studentProfile: { 
          status: 'loaded',
          studentProfile: expstudentProfileClickEdit
        },
      }
    case EXPERIENCE_DETAIL_DELETE:
      let expstudentProfileDelete = Object.assign({},state.studentProfile);
      debugger
      expstudentProfileDelete.studentProfile.experienceDetails = expstudentProfileDelete.studentProfile.experienceDetails.filter(experienceDetail =>{
        if(experienceDetail._id == action.payload){
          return false;
        }
        return true
      })
      return {
        ...state,
        studentProfile: expstudentProfileDelete
      }
    default: return state
  }
}