import React, {Fragment} from 'react';
import 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

import styled from 'styled-components';
import { Provider } from 'react-redux';

import configureStore from './store/store';
import HomeScreen from "./screens/HomeScreen";
import DrawerNavigator from "./navigation/DrawerNavigator";

const Container = styled.View`
  flex : 1;
  padding : 20px;
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
      <DrawerNavigator />
    </Container>
  );
};

export default App;
