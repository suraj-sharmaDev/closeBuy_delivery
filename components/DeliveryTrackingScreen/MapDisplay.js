import React from "react";
import MapView from "react-native-maps";
import styled from "styled-components";

const MapContainer = styled.View` 
  height : 100%;
  z-index : 14;
`;
const View = styled.View`
  background-color : #0E5159;
  padding : 3px;
  border-radius : 12px;
`;
const Text = styled.Text`
  color : white;
`;
const MapDisplay = (props) => {
  React.useEffect(()=>{

  },[props.userLocation]);

  const onRegionChange = (coords) => {
    // console.warn(coords);
  }
  let content = (
    <MapView
      style={{height: '100%'}}
      minZoomLevel={10}
      ref={props._mapRef}
      region={props.userLocation}
      onRegionChangeComplete={onRegionChange}
    >
      <MapView.Marker coordinate={props.marker}>
        <View>
          <Text>D_Boy</Text>
        </View>
      </MapView.Marker>
    </MapView>
  );
  return content;
};

export default MapDisplay;
