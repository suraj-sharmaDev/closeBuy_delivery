import { SAVE_ADDRESS, DELETE_ADDRESS } from './types';

export const saveAddress = data => {
  return {
    type: SAVE_ADDRESS,
    payload: data
  }
}

export const deleteAddress =() => {
  return {
    type: DELETE_ADDRESS,
  }
}

