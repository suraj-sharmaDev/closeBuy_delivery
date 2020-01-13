import React from 'react';
import {ScrollView, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';

import HomeScreen from '../screens/HomeScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import OrdersViewScreen from '../screens/OrdersViewScreen';

const DrawerNavigator = createDrawerNavigator(
  {
    HomeScreen,
    OrderDetailScreen,
    OrdersViewScreen
  },
  {
    drawerPosition : 'left',
    unmountInactiveRoutes : false,
    edgeWidth : 10,
    minSwipeDistance : 20,
    drawerBackgroundColor : '#9A9AEA',
    overlayColor : 'green',
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1
      }
    }    
  }
);

export default createAppContainer(DrawerNavigator);