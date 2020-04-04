import React from 'react';
import {Alert} from 'react-bootstrap';
import {
  COMPANY_PROFILE_DATA,
  COMPANY_PROFILE_ERROR,
  UPDATE_COMPANY_PROFILE_SUCCESS,
  UPDATE_COMPANY_PROFILE_ERROR,
} from '../constants/action-types';
import axios from 'axios';
import { rooturl } from '../../config/config';

export const getCompanyProfile = (id) => dispatch => {
  axios.get(`${rooturl}/company_profile/${id}`, {
    validateStatus: false,
  }).then((resp) => {
    if (resp.status === 200) {
      dispatch({
        type: COMPANY_PROFILE_DATA,
        payload: resp.data
      })
    } else {
      dispatch({
        type: COMPANY_PROFILE_ERROR
      });
    }
  });
};

export const updateCompanyProfile = (companyProfileId,formData) => dispatch => {
  axios.post(`${rooturl}/company_profile/${companyProfileId}`, formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((resp) => {
      if (resp.status === 200 && resp.data.success) {
        dispatch({
          type: UPDATE_COMPANY_PROFILE_SUCCESS
        });
      } else {
        dispatch({
          type: UPDATE_COMPANY_PROFILE_ERROR,
          payload: <Alert variant="danger">resp.body.error</Alert>
        });
      }
    });
};