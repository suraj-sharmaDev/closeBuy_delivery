import Geolocation from 'react-native-geolocation-service';
import {UpdateLocation} from './API';
import { PermissionsAndroid } from 'react-native';

const GeolocationService = ( deliveryBoyId, customerId, callback) => {
	let watchId = null;
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
				formData.append('deliveryBoyId', deliveryBoyId);
				formData.append('customerId', customerId);
				formData.append('coordinates', JSON.stringify(region));
				UpdateLocation(formData)
				.then((result)=>{
					callback(region);
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

	requestPermission();
	// if(startLocationFlag)
	// {
		// requestPermission();
	// }
	// else{
	//     Geolocation.clearWatch(watchId);    
	// }	
}

export default GeolocationService;