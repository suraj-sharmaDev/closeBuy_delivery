import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import {UpdateLocation} from './API';
import { PermissionsAndroid } from 'react-native';
import {connect} from 'react-redux';
import {updateCoordinate} from "../store/actions/user";

const GeolocationService = (props) => {
	let watchId = null;
	React.useEffect(()=>{
		requestPermission();
		return ()=>{
		    Geolocation.clearWatch(watchId);    
		}
	},[])
	const requestPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: 'CloseBuy Location Permission',
					message:
						'CloseBuy needs to access your Geolocation' +
						' so you can access nearby shops.',
					buttonNeutral: 'Ask Me Later',
					buttonNegative: 'Cancel',
					buttonPositive: 'OK',
				},
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				getCurrentLocation();
			} else {
				// alert for it being compulsory
			}
		} catch (err) {
			console.warn(err);
		}
	};

	const getCurrentLocation = () => {
		watchId = Geolocation.watchPosition(
			position => {
				let region = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				};
				let formData = new FormData();
				formData.append('deliveryBoyId', props.user.deliveryBoyId);
				formData.append('customerId', props.order.customerId);
				formData.append('coordinates', JSON.stringify(region));
				UpdateLocation(formData)
				.then((result)=>{
					props.onUpdateCoordinate(region);
				})
				.catch((err)=>{
					console.warn(err);
				})
			},
			error => {
				navigation.goBack();
			},
			{enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter:5},
		);
	};
	return null;
}
const mapStateToProps = state => {
  return {
    user : state.user,
    order : state.order,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSubscribe : data => {
      dispatch(subscribe(data));
    },
    onUpdateCoordinate : data => {
      dispatch(updateCoordinate(data));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GeolocationService);