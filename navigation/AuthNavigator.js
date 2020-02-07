import React from 'react';
import {connect} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import {receiveCurrentOrder, receivePendingOrder} from '../store/actions/order';
import {updateStatus, logout} from "../store/actions/user";

import {Initialize} from '../middleware/API';
import LoginScreen from "../screens/LoginScreen";
import AppNavigator from "./AppNavigator";


const AuthNavigator = (props) => {
	const [initialized, updateInitialized] = React.useState('');
	React.useEffect(()=>{
		SplashScreen.hide();		
		return ()=>{
		}
	},[])

	const appInitializer = async() => {
		// props.onLogout();
		if(initialized===''){
			Initialize(props.user.deliveryBoyId)
				.then(async result => {
					if (result.error) {
						updateInitialized('initialized');
					} else {
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
		if(initialized === 'initialized'){
			content = <AppNavigator />;
		}
		appInitializer();		
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
    	onlineStatus = (data.online_status=='0' || data.online_status==null) ? false : true;
    	dispatch(updateStatus({status : onlineStatus, rowId : 0}))
    },
    onLogout : () => {
    	dispatch(logout())
    }
  }
};
export default React.memo(connect(mapStateToProps, mapDispatchToProps)(AuthNavigator));