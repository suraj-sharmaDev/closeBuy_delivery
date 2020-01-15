import { RECEIVE_CURRENT_ORDER, RECEIVE_PENDING_ORDER, ACCEPT_ORDER, COMPLETE_ORDER } from '../actions/types';

const initialState = {
	currentOrder : {},
	pendingOrders : []
};

const onReceiveCurrentOrder = (state, data) => {
	let newState = {...state};
	newState.currentOrder = { 
		orderId : data.id,
		orderStatus : data.delivery_status,
		customerId : data.customer_id,
		distributorId : data.dist_point_id,
		orderItems : JSON.parse(data.items_added),
		deliveryCoordinates : JSON.parse(data.delivery_address), 
		pickupCoordinates : JSON.parse(data.distribution_point_coordinates)
	};
	return newState;
}
const onCompleteOrder = (state) => {
	let newState = {...state};
	newState.currentOrder = {};
	return newState;
}
const onReceivePendingOrder = (state, data) => {
	let newState = {...state};
	newState.pendingOrders = [];
	data.map((d)=>{
		newState.pendingOrders.push({
			orderId : d.id,
			orderStatus : d.delivery_status,
			customerId : d.customer_id,
			distributorId : d.dist_point_id,
			orderItems : JSON.parse(d.items_added),
			deliveryCoordinates : JSON.parse(d.delivery_address), 
			pickupCoordinates : JSON.parse(d.distribution_point_coordinates)			
		})
	});
	return newState;
}
const onAcceptOrder = (state, index) => {
	//index is the array index of current order
	let newState = {...state};
	acceptedOrder = newState.pendingOrders[index];
	acceptedOrder.orderStatus = 'accepted';
	newState.currentOrder = acceptedOrder;
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
  		return onCompleteOrder(state);
    default:
      return state;
  }
}

export default addressReducer;