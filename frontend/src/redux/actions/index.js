import { LOG_IN, LOG_OUT } from '../constants/action-types';


export function LoginIn(payload) {
  return { type: LOG_IN, payload };
}
export function LogOut(payload) {
  return { type: LOG_OUT, payload };
}
