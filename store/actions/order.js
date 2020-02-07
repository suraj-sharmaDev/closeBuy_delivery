import { RECEIVE_CURRENT_ORDER, RECEIVE_PENDING_ORDER, ACCEPT_ORDER, UPDATE_ORDER_STATUS, COMPLETE_ORDER } from './types';

export const receiveCurrentOrder = data => {
  return {
    type: RECEIVE_CURRENT_ORDER,
    payload: data
  }
}
export const acceptOrder = data => {
  return {
    type: ACCEPT_ORDER,
    payload: data
  }
}
export const updateOrderStatus = data => {
  return {
    type: UPDATE_ORDER_STATUS,
    payload: data
  }
}
export const receivePendingOrder = data => {
  return {
    type: RECEIVE_PENDING_ORDER,
    payload: data
  }
}
export const completeOrder = (index) => {
  return {
    type: COMPLETE_ORDER,
    payload: index
  }
}