import React, {Fragment} from 'react';
import 'react-native-gesture-handler';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import {configureStore, persistor} from './store/store';
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
			<PersistGate loading={null} persistor={persistor}>
          		<AuthNavigator />
      		</PersistGate>        
        </Provider>        
      </Container>
  );
};

export default App;
