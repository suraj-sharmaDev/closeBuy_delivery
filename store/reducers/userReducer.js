import { LOGIN, LOGOUT, SUBSCRIBE, COORDINATE_UPDATE } from '../actions/types';

const initalState = {
	loggedIn : true,	
	deliveryBoyId : 1,
	coordinate : null,
	apiKey : ''
}

const subscribe = (state, data) => {
	newState = {...state};
	newState.fcmToken = data;
	return newState;
}
const updateCoordinate = (state, data) => {
	newState = {...state};
	newState.coordinate = data;
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
		loggedIn : false,	
		deliveryBoyId : 1,
		coordinate : null,
		apiKey : ''
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
        case COORDINATE_UPDATE :
        	return updateCoordinate(state, action.payload);        	
		default :
			return state;
	}
}

export default userReducer;