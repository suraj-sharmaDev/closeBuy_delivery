import { LOGIN, LOGOUT, SUBSCRIBE } from './types';

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