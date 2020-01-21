import React from 'react';
import {connect} from 'react-redux';

import {receiveCurrentOrder, receivePendingOrder} from '../store/actions/order';
import {updateStatus} from "../store/actions/user";

import {Initialize} from '../middleware/API';
import LoginScreen from "../screens/LoginScreen";
import AppNavigator from "./AppNavigator";


const AuthNavigator = (props) => {
	const [initialized, updateInitialized] = React.useState(null);
	React.useEffect(()=>{
		return ()=>{
		}
	},[])

	const appInitializer = async() => {
		if(initialized===null){
			Initialize(props.user.deliveryBoyId)
				.then(async result => {
					if (result.error) {
						// console.warn(result);
						updateInitialized('initialized');
					} else {
						// console.warn(result);
						//latest updated information for this deliveryBoy
						await props.onRetrieveData(result);
						updateInitialized('initialized');
					}
				})
				.catch(err => {
					console.warn(err);
					// updateInitialized('api_error');
				});
		}
	}

	let content = null;
	if(props.user.loggedIn){
		//initialize app only when user has been verified and not already initialized
		appInitializer();
		if(initialized === 'initialized'){
			content = <AppNavigator />;
		}
	}else{
		content = <LoginScreen />;
	}

	return content;
};

const mapStateToProps = state =>{
	return {
		user : state.user,
	}
}
const mapDispatchToProps = dispatch => {
  return {
    onRetrieveData : data => {
    	if(!data.current_order.error){
    		//save current Orders
    		dispatch(receiveCurrentOrder(data.current_order.reason));
    	}if(!data.pending_orders.error){
    		//save pending orders
    		dispatch(receivePendingOrder(data.pending_orders.reason));
    	}
    	//Save deliveryBoy online status
    	dispatch(updateStatus(data.online_status==='0' ? false : true))
    },
  }
};
export default React.memo(connect(mapStateToProps, mapDispatchToProps)(AuthNavigator));