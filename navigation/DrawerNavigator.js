import React from 'react';
import {Dimensions} from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import SideBar from "../components/DrawerNavigator/SideBar";
import HomeScreen from '../screens/HomeScreen';
import OrdersHistoryScreen from '../screens/OrdersHistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const DrawerNavigator = createDrawerNavigator(
  {
    HomeScreen: {
      screen : HomeScreen,
      navigationOptions : {
        title : "Home",
        drawerIcon : ({tintColor}) => <Icon name="account-circle" color={tintColor} size={12} />
      }
    },
    OrdersHistoryScreen: {
      screen : OrdersHistoryScreen,
      navigationOptions : {
        title : "All Orders",
        drawerIcon : ({tintColor}) => <Icon name="account-badge-outline" color={tintColor} size={12} />
      }      
    },
    ProfileScreen: {
      screen : ProfileScreen,
      navigationOptions : {
        title : "Profile",
        drawerIcon : ({tintColor}) => <Icon name="account-circle" color={tintColor} size={12} />
      }      
    }
  },
  {
    unmountInactiveRoutes : false,
    drawerWidth : Dimensions.get('window').width * 0.75,
    drawerBackgroundColor : Colors.lighterGreenColor,
    overlayColor : 'white',
    hideStatusBar : false,
    contentComponent: props => (<SideBar {...props} />),        
    contentOptions: {
      activeTintColor: Colors.tabIconSelected,
      itemsContainerStyle: {
        marginVertical: 0,
        marginHorizontal : 0
      },
      itemStyle : {
        borderRadius: 10
      },
      iconContainerStyle: {
        opacity: 1
      }
    },
  }
);

export default createAppContainer(DrawerNavigator);