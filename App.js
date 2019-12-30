import React, {Fragment} from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

import NotificationService from './middleware/NotificationService';
import GeolocationService from './middleware/GeolocationService';
import Api from './middleware/Api';

import MapScreen from './screens/MapScreen';

const {height, width} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Container = styled.View`
  flex-direction : column;
  align-items : center;
  justify-content : center;
`;
const Button = styled.TouchableOpacity`
  padding : 10px;
  margin : 20px 0px;
`;
const Text = styled.Text`
  font-size : 20px;
`;

const App = () => {
  const [startLocation, updateStartLocation] = React.useState(true);
  const [userLocation, updateUserLocation] = React.useState(null);
  React.useEffect(()=>{
    GeolocationService(startLocation, returnCoords);
    NotificationService(fetchDeliveryLocation);
    return()=>{
      updateStartLocation(false);
    }
  },[])

  const returnCoords = (data) => {
    Api(data);
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
  return (
    <Container>
      <Text>Delivery Boy</Text>
      <Button onPress={()=>Api(userLocation)}>
        <Text>Click Me</Text>
      </Button>
      <MapScreen userLocation={userLocation}/>
    </Container>
  );
};

export default App;
