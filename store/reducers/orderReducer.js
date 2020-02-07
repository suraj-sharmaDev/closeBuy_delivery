import { RECEIVE_CURRENT_ORDER, RECEIVE_PENDING_ORDER, ACCEPT_ORDER, UPDATE_ORDER_STATUS, COMPLETE_ORDER } from '../actions/types';

const initialState = {
	currentOrder : [],
	pendingOrders : []
};

const onReceiveCurrentOrder = (state, data) => {
	let newState = {...state};
	newState.currentOrder = [];
	data.map((d)=>{
		newState.currentOrder.push({
			orderId : d.id,
			orderStatus : d.delivery_status,
			customerId : d.customer_id,
			customerName : d.customer_name,
			customerMobile : d.customer_mobile,
			distributorId : d.dist_point_id,
			distributorName : d.dist_point_name,
			orderItems : JSON.parse(d.items_added),
			deliveryCoordinates : JSON.parse(d.delivery_address), 
			pickupCoordinates : JSON.parse(d.distribution_point_coordinates),
			pickupAddress : d.pickup_address
		})
	})
	return newState;
}
const onUpdateOrderStatus = (state, data) => {
	let newState = {...state};
	newState.currentOrder[data.index].orderStatus = data.status;
	return newState; 
}
const onCompleteOrder = (state, index) => {
	let newState = {...state};
	newState.currentOrder = newState.currentOrder.filter((_, i) => i !== index);
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
			customerName : d.customer_name,
			customerMobile : d.customer_mobile,
			distributorId : d.dist_point_id,
			distributorName : d.dist_point_name,
			orderItems : JSON.parse(d.items_added),
			deliveryCoordinates : JSON.parse(d.delivery_address), 
			pickupCoordinates : JSON.parse(d.distribution_point_coordinates),
			pickupAddress : d.pickup_address
		})
	});
	return newState;
}
const onAcceptOrder = (state, index) => {
	//index is the array index of current order
	let newState = {...state};
	acceptedOrder = newState.pendingOrders[index];
	acceptedOrder.orderStatus = 'accepted';
	newState.currentOrder.push(acceptedOrder);
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
  	case UPDATE_ORDER_STATUS :
  		return onUpdateOrderStatus(state, action.payload);
  	case COMPLETE_ORDER :
  		return onCompleteOrder(state, action.payload);
    default:
      return state;
  }
}

export default addressReducer;