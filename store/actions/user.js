import { LOGIN, LOGOUT, SUBSCRIBE, STATUS_UPDATE, COORDINATE_UPDATE } from './types';

export const login = data => {
  return {
    type: LOGIN,
    payload: data
  }
}

export const logout = () => {
  return {
    type: LOGOUT,
  }
}

export const updateStatus = (data) => {
  return {
    type : STATUS_UPDATE,
    payload : data
  }
}
export const subscribe = (data) => {
	return {
		type : SUBSCRIBE,
		payload : data
	}
}

export const updateCoordinate = (data) => {
  return {
    type : COORDINATE_UPDATE,
    payload : data
  }
}