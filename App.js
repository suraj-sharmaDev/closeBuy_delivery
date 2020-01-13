import React, {Fragment} from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Provider } from 'react-redux';

import configureStore from './store/store';
import DeliveryTrackingScreen from './screens/DeliveryTrackingScreen';

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
  return (
    <Container>
      <Text>Delivery Boy</Text>
      <Button onPress={()=>Api(userLocation)}>
        <Text>Click Me</Text>
      </Button>
      <Provider store = { configureStore }>
        <DeliveryTrackingScreen/>
      </Provider>      
    </Container>
  );
};

export default App;
