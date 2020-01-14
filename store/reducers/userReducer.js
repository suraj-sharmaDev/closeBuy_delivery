import { LOGIN, LOGOUT, SUBSCRIBE } from '../actions/types';

const initalState = {
	deliveryBoyId : 1,
	apiKey : '',
	loggedIn : true
}

const subscribe = (state, data) => {
	newState = {...state};
	newState.fcmToken = data;
	return newState;
}
const login = (state, deliveryBoyId) => {
	newState = {...state};
	newState.deliveryBoyId = deliveryBoyId;
	newState.loggedIn = true;
	return newState;
}
const logout = () => {
	let initalState = {
		deliveryBoyId : null,
		fcmToken : '',
		apiKey : '',
		loggedIn : false		
	}
	return initalState;
}
const userReducer = (state=initalState, action) => {
	switch(action.type) {
		case LOGIN :
			return login(state, action.payload);
        case LOGOUT :
            return logout();
        case SUBSCRIBE :
        	return subscribe(state, action.payload);
		default :
			return state;
	}
}

export default userReducer;