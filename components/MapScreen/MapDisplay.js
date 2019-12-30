import React from "react";
import { Dimensions, View } from 'react-native';
import MapView from "react-native-maps";
import styled from "styled-components";


const MapContainer = styled.View` 
  height : 100%;
  z-index : 14;
`;
const {height, width} = Dimensions.get('window');
const MapDisplay = (props) => {
  console.warn(props.userLocation);
  let content = (
    <MapView
      style={{height: '100%'}}
      minZoomLevel={10}
      ref={props._mapRef}
      initialRegion={props.userLocation}
      showsUserLocation={true}
      onRegionChangeComplete={props.onRegionChange}
    />
  );
  return content;
};

export default MapDisplay;
