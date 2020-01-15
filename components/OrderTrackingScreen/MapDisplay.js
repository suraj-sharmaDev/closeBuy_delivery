import React from "react";
import { Dimensions, View } from 'react-native';
import MapView from "react-native-maps";
import styled from "styled-components";

import {GetDirection} from '../../middleware/API';

import MapTools from './MapTools';
const MapContainer = styled.View` 
  height : 50%;
`;
const {height, width} = Dimensions.get('window');
const MapDisplay = (props) => {
  const startCoords = props.markers.deliveryBoyMarker;
  const destinationCoords = props.orderStatus === 'pickup' ? props.markers.distributorMarker : props.markers.customerMarker;
  React.useEffect(()=>{
    // initializeDirection();
  },[props.orderStatus])

  const initializeDirection = () => {
    GetDirection(startCoords, destinationCoords)
    .then((result)=>{
      console.warn(result);
    })
    .catch((err)=>{
      console.warn(err);
    })
  }
  const _mapRef = (ref) => {
    _map = ref;
  }    
  const mapFitOnScreen = () => {
    let edgePadding = {bottom: 100, right: 24, left: 0, top: 20};
    _map.fitToCoordinates([startCoords, destinationCoords], {
      edgePadding,
      animated: true,
    });
  }  
  let content = (
    <MapContainer>
      <MapView
        style={{ height : '100%'}}
        minZoomLevel={10}
        ref={_mapRef}
        initialRegion={props.userLocation}
        showsUserLocation = {true}
        onRegionChangeComplete={props.onRegionChange}
        onMapReady={mapFitOnScreen}
      >
        <MapView.Polyline 
          coordinates={[startCoords, destinationCoords]}
          strokeWidth={2}
          strokeColor="red"
        />      
      </MapView>
      <MapTools openNativeMaps={props.openNativeMaps}/>
    </MapContainer>  
  );
  return content;
};

export default MapDisplay;
