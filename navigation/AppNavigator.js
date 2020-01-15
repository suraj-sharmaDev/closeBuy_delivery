import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import DrawerNavigator from "./DrawerNavigator";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import OrderCompletionScreen from "../screens/OrderCompletionScreen";
import OrderTrackingScreen from "../screens/OrderTrackingScreen";
const ScreensStack = createStackNavigator(
  {
    Drawer: {
      screen: DrawerNavigator,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    OrderDetail : {
      screen: OrderDetailScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    OrderTrack : {
      screen: OrderTrackingScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    OrderCompletion : {
      screen: OrderCompletionScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
  },
  {
    initialRouteName: "Drawer",
    headerMode: "screen"
  }
);

const AppNavigator = createAppContainer(ScreensStack);
export default AppNavigator;