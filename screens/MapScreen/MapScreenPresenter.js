import React from "react";
import { Platform, PermissionsAndroid, Dimensions, Keyboard } from 'react-native';
import styled from "styled-components";

import MapDisplay from "../../components/MapScreen/MapDisplay";

const {height, width} = Dimensions.get('window');

const Theme = styled.View`
  height : ${height};
  width : ${width};
`;
const Text = styled.Text``;

const MapScreenPresenter = (props) => {
  React.useEffect(() => {

  }, [props.userLocation]);

  const _mapRef = (ref) => {
    _map = ref;
  }

  //Above this line are codes for functions
  //Below this line are codes for rendering content
  let map = props.userLocation!==null ?
      <MapDisplay 
        _mapRef={_mapRef}
        userLocation={props.userLocation}
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

export default MapScreenPresenter;
