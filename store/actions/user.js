import { LOGIN, LOGOUT, SUBSCRIBE, COORDINATE_UPDATE } from './types';

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