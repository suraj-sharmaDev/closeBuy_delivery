import React, {Fragment} from 'react';
import 'react-native-gesture-handler';
import styled from 'styled-components';
import { Provider } from 'react-redux';

import configureStore from './store/store';
import GeneralStatusBar from "./components/GeneralStatusBar";
import AuthNavigator from "./navigation/AuthNavigator";

const Container = styled.View`
  flex : 1;
`;

const App = () => {
  return (
      <Container>
        <GeneralStatusBar/>
        <Provider store = { configureStore }>
          <AuthNavigator />
        </Provider>        
      </Container>
  );
};

export default App;
