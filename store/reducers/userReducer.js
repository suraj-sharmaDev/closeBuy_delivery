import { LOGIN, LOGOUT, STATUS_UPDATE, SUBSCRIBE, COORDINATE_UPDATE } from '../actions/types';

const initalState = {
	loggedIn : false,	
	deliveryBoyId : 1,
	deliveryBoyStatus : true,
	rowId : 0,
	coordinate : null,
	apiKey : ''
}

const subscribe = (state, data) => {
	newState = {...state};
	newState.fcmToken = data;
	return newState;
}
const updateOnlineStatus = (state, data) => {
	newState = {...state};
	newState.deliveryBoyStatus = data.status;
	newState.rowId = data.rowId;
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
		deliveryBoyStatus : false,
		rowId : 0,
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
        case STATUS_UPDATE :
        	return updateOnlineStatus(state, action.payload);
        case SUBSCRIBE :
        	return subscribe(state, action.payload);
        case COORDINATE_UPDATE :
        	return updateCoordinate(state, action.payload);        	
		default :
			return state;
	}
}

export default userReducer;