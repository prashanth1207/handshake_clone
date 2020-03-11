import { LOG_IN, LOG_OUT } from '../constants/action-types';


const intialState = {
  loggedIn: !!sessionStorage.getItem('userInfo'),
};

export default function rootReducer(state = intialState, action) {
  if (action.type === LOG_IN) {
    return { ...state, loggedIn: true };
  }
  if (action.type === LOG_OUT) {
    return { ...state, loggedIn: false };
  }
  return state;
}
