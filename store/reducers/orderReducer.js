import { RECEIVE_CURRENT_ORDER, RECEIVE_PENDING_ORDER, ACCEPT_ORDER, COMPLETE_ORDER } from '../actions/types';

const initialState = {
	currentOrder : {
		orderId : null,
		customerId : null,
		distributorId : null,			
		deliveryCoordinates: {},
		pickupCoordinates: {},
	},
	pendingOrders : [
		{
			orderId : null,
			customerId : null,
			distributorId : null,			
			deliveryCoordinates: {},
			pickupCoordinates: {},
		}
	]
};

const onReceiveCurrentOrder = (state, data) => {
	let newState = {...state};
	let currentOrder = { 
		orderId : data.id,
		customerId : data.customer_id,
		distributorId : dist_point_id,
		orderItems : data.items_added,
		deliveryCoordinates : data.delivery_address, 
		pickupCoordinates : data.distribution_point_coordinates,
	};
	newState.currentOrder = currentOrder;
	return newState;	
}
const onCompleteOrder = (state) => {
	let newState = {...state};
	newState.currentOrder = {
		orderId : null,
		customerId : null,
		distributorId : null,			
		deliveryCoordinates: {},
		pickupCoordinates: {},		
	};
	return newState;
}
const onReceivePendingOrder = (state, data) => {
	let newState = {...state};
	let pushData = { 
		orderId : data.id,
		customerId : data.customer_id,
		distributorId : dist_point_id,
		orderItems : data.items_added,
		deliveryCoordinates : data.delivery_address, 
		pickupCoordinates : data.distribution_point_coordinates,
	};
	newState.pendingOrders.push(pushData);
	return newState;
}
const onAcceptOrder = (state, index) => {
	//index is the array index of current order
	let newState = {...state};
	newState.pendingOrders.splice(index,1);
	return newState;
}

const addressReducer = (state = initialState, action) => {
  switch(action.type) {
  	case RECEIVE_PENDING_ORDER : 
  		return onReceivePendingOrder(state, action.payload);
  	case RECEIVE_CURRENT_ORDER :
  		return onReceiveCurrentOrder(state, action.payload);
  	case ACCEPT_ORDER :
  		return onAcceptOrder(state, action.payload);
  	case COMPLETE_ORDER :
  		return onCompleteOrder(state, action.payload);
    default:
      return state;
  }
}

export default addressReducer;