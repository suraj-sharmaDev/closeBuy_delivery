import React from "react";
import { Platform, PermissionsAndroid, Dimensions, Keyboard } from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';

import {subscribe} from '../../store/actions/user';
import NotificationService from '../../middleware/NotificationService';
import GeolocationService from '../../middleware/GeolocationService';
import Api from '../../middleware/Api';
import MapDisplay from "../../components/DeliveryTrackingScreen/MapDisplay";

const {height, width} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Theme = styled.View`
  height : ${height};
  width : ${width};
`;
const Text = styled.Text``;

const DeliveryTrackingScreenPresenter = (props) => {
  const [startLocationFlag, updateStartLocationFlag] = React.useState(true);
  const [userLocation, updateUserLocation] = React.useState(null);
  React.useEffect(()=>{
    if(props.user.fcmToken!=''){
      GeolocationService(startLocationFlag, returnCoords);
    }else{
      NotificationService(props.user.fcmToken, fetchDeliveryLocation, props.onSubscribe);
    }
    return()=>{
      updateStartLocationFlag(false);
    }
  },[props.user.fcmToken])

  const returnCoords = (data) => {
    Api(data, props.user.fcmToken);
    // updateUserLocation(data);
  }
  const fetchDeliveryLocation = (data) => {
    let region = {
      latitude : parseFloat(data.latitude),
      longitude : parseFloat(data.longitude),
      latitudeDelta : LATITUDE_DELTA, 
      longitudeDelta : LONGITUDE_DELTA    
    }
    updateUserLocation(region);
  }

  const _mapRef = (ref) => {
    _map = ref;
  }

  let map = userLocation!==null ?
      <MapDisplay 
        _mapRef={_mapRef}
        userLocation={userLocation}
        marker={{latitude : parseFloat(userLocation.latitude),longitude : parseFloat(userLocation.longitude)}}
      />
      :
      <Text>Loading</Text>

  let content = (
  <Theme stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
    {map}
  </Theme>
  );
  return content;
};

const mapStateToProps = state => {
  return {
    user : state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSubscribe : data => {
      dispatch(subscribe(data));
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(DeliveryTrackingScreenPresenter);
