import {LOG_IN} from './../constants/action-types'
import {LOG_OUT} from './../constants/action-types'

const intialState = {
  loggedIn: sessionStorage.getItem('userInfo') ? true : false,
}

export default function rootReducer(state = intialState,action){
  if(action.type === LOG_IN){
    return Object.assign({},state,{loggedIn: true})
  }
  if(action.type === LOG_OUT){
    return Object.assign({},state,{loggedIn: false})
  }
  return state
}