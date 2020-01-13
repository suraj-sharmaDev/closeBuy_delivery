import React from 'react';
import {connect} from 'react-redux';

import {Initialize} from '../middleware/API';

import {retrieveAddress} from '../store/actions/address';
import {retrieveCart, trackStart} from '../store/actions/cart';

import LoginNavigator from "./LoginNavigator";
import AppNavigator from "./AppNavigator";


const AuthNavigator = (props) => {
	const [initialized, updateInitialized] = React.useState(null);
	React.useEffect(()=>{
		//After login is done we have to refresh our localstorage
		//for saved addresses and other details stored in cloud
	},[])

	const appInitializer = async() => {
		if(initialized===null){
			Initialize(props.user.userId)
				.then(async result => {
					if (result.error) {
						//If there are no saved addresses
						// updateInitialized('initialized');
					} else {
						//if saved addresses found retrieve it
						await props.onRetrieveData(result);
						updateInitialized('initialized');
					}
				})
				.catch(err => {
					console.warn(err);
					updateInitialized('api_error');
				});
		}
	}

	let content = null;
	if(props.user.loggedIn && props.user.verified){
		//initialize app only when user has been verified and not already initialized
		appInitializer();
		if(initialized === 'initialized'){
			content = <AppNavigator />;
		}
	}else{
		content = <LoginNavigator />;
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
      if(data.address.error===false){
      	  //insert addresses saved in database
	      dispatch(retrieveAddress(data.address.reason));
      }if(data.cart.error===false){
      	  //insert items to cart fetched from database
	      dispatch(retrieveCart(data.cart.reason));
      }if(data.order.error===false){
      	//if order was created call necessary functions
          dispatch((trackStart(data.order.reason)));
      }
    },
  }
};
export default React.memo(connect(mapStateToProps, mapDispatchToProps)(AuthNavigator));