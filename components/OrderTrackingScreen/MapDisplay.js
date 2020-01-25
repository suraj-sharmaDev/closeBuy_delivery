import React from "react";
import { Dimensions, View } from 'react-native';
import MapView from "react-native-maps";
import styled from "styled-components";

import {GetDirection} from '../../middleware/API';
import MapTools from './MapTools';

const {height, width} = Dimensions.get('window');
const MapContainer = styled.View` 
  height : 50%;
`;
const MarkerImage = styled.Image`
  width : 24px;
  height : 24px;
`;

const MapDisplay = (props) => {
  const startCoords = props.markers.deliveryBoyMarker;
  const destinationCoords = props.orderStatus != 'picked' ? props.markers.distributorMarker : props.markers.customerMarker;
  const [directionCoords, updateDirectionCoords] = React.useState(null);
  React.useEffect(()=>{
    initializeDirection();
    mapFitOnScreen();
  },[props.orderStatus])

  const initializeDirection = () => {
    GetDirection(startCoords, destinationCoords)
    .then((result)=>{
      updateDirectionCoords(result);
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
        showsUserLocation = {false}
        onRegionChangeComplete={props.onRegionChange}
        onMapReady={mapFitOnScreen}
      >
        <MapView.Marker 
          coordinate={startCoords}
        >
          <MarkerImage source={require('../../assets/images/scooter.png')} />
        </MapView.Marker>
        <MapView.Marker 
          coordinate={destinationCoords}
        >
          <MarkerImage source={require('../../assets/images/marker.png')} />
        </MapView.Marker>
        {
          directionCoords!==null
          ?
          <MapView.Polyline 
            coordinates={directionCoords}
            strokeWidth={2}
            strokeColor="red"
          />      
          :
          null
        }      
        </MapView>
      <MapTools openNativeMaps={props.openNativeMaps}/>
    </MapContainer>  
  );
  return content;
};

export default MapDisplay;
