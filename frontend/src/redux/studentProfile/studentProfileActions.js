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
import {storedUserInfo } from '../../utility'
import { rooturl } from '../../config/config'
import axios from 'axios';

export const getStudentProfile = (studentProfileId) => dispatch => {
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  axios.get(`${rooturl}/student_profile/${studentProfileId}`, {
    validateStatus: false,
  }).then((resp) => {
    console.log(resp.status);
    if (resp.status === 200) {
      dispatch({
        type: STUDENT_PROFILE_SHOW,
        payload: { status: 'recordFound', studentProfile: resp.data }
      });
    } else {
      dispatch({
        type: STUDENT_PROFILE_SHOW,
        payload: { status: 'recordNotFound' }
      });
    }
  });
}

export const studentProfileSubmit = (formData, studentProfileId) => dispatch => {
  axios.defaults.withCredentials = false;
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  axios.post(`${rooturl}/student_profile/${studentProfileId}`, formData)
    .then(resp => {
      if (resp.status === 200 && !resp.data.error) {
        dispatch({
          type: STUDENT_PROFILE_EDIT,
          payload: resp.data,
        });
      } 
      // else {
      //   setprofileErrorMsg(<Alert variant="danger">{resp.data.error}</Alert>);
      // }
    });
};

export const uploadProfilePic = (formData, studentProfileId) => dispatch => {
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  axios.post(`${rooturl}/student_profile/${studentProfileId}/upload_profile_pic`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((resp) => {
      if (resp.status === 200 && resp.data.success) {
        dispatch({
          type: STUDENT_PROFILE_PIC_UPDATE,
          payload: resp.data.success,
        });
      } else {
        dispatch({
          type: STUDENT_PROFILE_PIC_UPDATE_ERROR,
          payload: resp.data.error
        });
      }
    });
};


export const educationDetailEdit = (formData) => dispatch => {
  axios.defaults.withCredentials = false;
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  return axios.post(`${rooturl}/education_details/create_update`, formData)
    .then((resp) => {
      if (resp.status === 200 && !resp.data.error) {
        dispatch({
          type: EDUCATION_DETAIL_EDIT,
          payload: resp.data.data,
        });
      }
    });
}
export const experienceDetailEdit = (formData) => dispatch => {
  axios.defaults.withCredentials = false;
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  return axios.post(`${rooturl}/experience_details/create_update`, formData)
    .then((resp) => {
      debugger
      if (resp.status === 200 && !resp.data.error) {
        dispatch({
          type: EXPERIENCE_DETAIL_EDIT,
          payload: resp.data.data,
        });
      }
    });
}

export const educationDetailClickEdit = (educationDetailId) => dispatch => {
  dispatch({
    type: EDUCATION_DETAIL_CLICK_EDIT,
    payload: educationDetailId,
  });
}

export const experienceDetailClickEdit = (experienceDetailId) => dispatch => {
  dispatch({
    type: EXPERIENCE_DETAIL_CLICK_EDIT,
    payload: experienceDetailId,
  });
}

export const educationDetailDelete = (id) => dispatch => {
  axios.defaults.withCredentials = false;
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  return axios.post(`${rooturl}/education_details/delete/${id}`)
    .then((resp) => {
      if (resp.status === 200 && resp.data.success) {
        dispatch({
          type: EDUCATION_DETAIL_DELETE,
          payload: id,
        });
      }
    });
}
export const experienceDetailDelete = (id) => dispatch => {
  axios.defaults.withCredentials = false;
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  return axios.post(`${rooturl}/experience_details/delete/${id}`)
    .then((resp) => {
      if (resp.status === 200 && resp.data.success) {
        dispatch({
          type: EXPERIENCE_DETAIL_DELETE,
          payload: id,
        });
      }
    });
}