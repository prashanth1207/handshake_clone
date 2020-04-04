import {
  SUCCESS_LOG_IN_RESPONSE,
  ERROR_LOG_IN_RESPONSE,
  LOG_OUT,
  STUDENT_SIGN_UP,
  COMPANY_SIGN_UP
} from '../constants/action-types';
import axios from 'axios';
import { rooturl } from '../../config/config';

export const userLogin = (formData) => dispatch => {
  axios.post(`${rooturl}/users/login`, formData)
  .then((response) => {
    console.log('Status Code : ', response.status);
    if (response.status === 200) {
      if (response.data.success === true) {
        sessionStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));
        dispatch({
          type: SUCCESS_LOG_IN_RESPONSE,
          payload: response.data.userInfo
        });
      } else {
        dispatch({
          type: ERROR_LOG_IN_RESPONSE,
          payload: response.data.error
        })
      }
    }
  });
}

export const userLogout = () => dispatch => {
  dispatch({
    type: LOG_OUT,
  })
}

export const userSignUp = (formData) => dispatch => {
  axios.post(`${rooturl}/users/register`, formData)
  .then((response) => {
    console.log('Status Code : ', response.status);
    if (response.status === 200) {
      if (response.data.success === true) {
        sessionStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));
        dispatch({
          type: SUCCESS_LOG_IN_RESPONSE,
          payload: response.data.userInfo
        });
      } else {
        dispatch({
          type: ERROR_LOG_IN_RESPONSE,
          payload: response.data.error
        })
      }
    }
  });
}