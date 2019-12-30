import React, {Fragment} from 'react';
import styled from 'styled-components';

import NotificationService from './middleware/NotificationService';
import GeolocationService from './middleware/GeolocationService';
import Api from './middleware/Api';

import MapScreen from './screens/MapScreen';

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
    GeolocationService(startLocation, displayCoords);
    NotificationService();
    return()=>{
      updateStartLocation(false);
    }
  },[])
  const sendNotification = () => {
    Api();
  }
  const displayCoords = (data) => {
    updateUserLocation(data);
  }
  return (
    <Container>
      <Text>Delivery Boy</Text>
      <Button onPress={sendNotification}>
        <Text>Click Me</Text>
      </Button>
      <MapScreen userLocation={userLocation}/>
    </Container>
  );
};

export default App;
