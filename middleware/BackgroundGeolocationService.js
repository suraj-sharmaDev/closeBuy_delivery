import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import {Dimensions, PermissionsAndroid } from 'react-native';

const {height, width} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const BackgroundGeolocationService = (mounted, updateCoordinate) => {
	BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 2,
      distanceFilter: 2,
      notificationTitle: 'Background tracking',
      notificationText: 'CloseBuy is searching your GPS',
      debug: false,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
    });	
  BackgroundGeolocation.getCurrentLocation(location => {
    //One time location check
    let region = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta : LATITUDE_DELTA,
      longitudeDelta : LONGITUDE_DELTA
    };
    updateCoordinate(region);
  });

	BackgroundGeolocation.on('location', location => {
		// handle your locations here
		// to perform long running operation on iOS
		// you need to create background task
		BackgroundGeolocation.startTask(taskKey => {
      let region = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta : LATITUDE_DELTA,
        longitudeDelta : LONGITUDE_DELTA
      };
      if(mounted){
        updateCoordinate(region);
      }
			BackgroundGeolocation.endTask(taskKey);
		});
	});
	
  BackgroundGeolocation.on('authorization', (status) => {
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(() =>
          Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
            { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
            { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
          ]), 1000);
      }
    });
	BackgroundGeolocation.checkStatus(status => {
      // you don't need to check status before start (this is just the example)
      if (!status.isRunning && mounted) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });    

  if(!mounted){
    BackgroundGeolocation.stop();
    BackgroundGeolocation.removeAllListeners();    
  }
}
export default BackgroundGeolocationService;