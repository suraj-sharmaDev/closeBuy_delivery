import { LOGIN, LOGOUT, SUBSCRIBE } from '../actions/types';

const initalState = {
	deliveryBoyId : '1234',
	fcmToken : '',
	apiKey : '',
	loggedIn : true,
	skip : false
}

const subscribe = (state, data) => {
	newState = {...state};
	newState.fcmToken = data;
	return newState;
}
const login = (state) => {
	newState = {...state};
	newState.loggedIn = true;
	return newState;
}
const logout = (state) => {
	newState = {...state};
	newState.loggedIn = false;
	return newState;
}
const userReducer = (state=initalState, action) => {
	switch(action.type) {
		case LOGIN :
			return login(state);
        case LOGOUT :
            return logout(state);
        case SUBSCRIBE :
        	return subscribe(state, action.payload);
		default :
			return state;
	}
}

export default userReducer;