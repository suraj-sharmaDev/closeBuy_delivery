import React, {Fragment} from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
} from 'react-native';
import NotificationService from './middleware/NotificationService';
const App = () => {
  React.useEffect(()=>{
    NotificationService();
  })
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Delivery Boy App</Text>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
