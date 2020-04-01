import React, {Component, Fragment} from 'react';
import 'react-native-gesture-handler';
import CodePush from 'react-native-code-push';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import {configureStore, persistor} from './store/store';
import GeneralStatusBar from "./components/GeneralStatusBar";
import AuthNavigator from "./navigation/AuthNavigator";

const Container = styled.View`
  flex : 1;
`;

class App extends Component {
  render(){
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
  }
};

let updateOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START
}

App = CodePush(updateOptions)(App);

export default App;
