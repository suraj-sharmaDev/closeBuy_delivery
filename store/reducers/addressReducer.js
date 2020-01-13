import { SAVE_ADDRESS, EDIT_ADDRESS, DELETE_ADDRESS, SELECT_ADDRESS } from '../actions/types';
const initialState = {
	deliveryCoordinates: {},
	customerToken : ''
};

const onSaveAddress = (state, data) => {
	let newState = {...state};
	let pushData = { deliveryCoordinates : data.coordinates, customerToken:data.token};
	newState.savedAddresses.push(pushData);
	return newState;
}
const onDeleteAddress = () => {
	const initialState = {
		deliveryCoordinates: {},
		customerToken : ''
	};
	return initialState;
}

const addressReducer = (state = initialState, action) => {
  switch(action.type) {
  	case SAVE_ADDRESS : 
  		return onSaveAddress(state, action.payload);
  	case DELETE_ADDRESS :
  		return onDeleteAddress(state, action.payload);
    default:
      return state;
  }
}

export default addressReducer;