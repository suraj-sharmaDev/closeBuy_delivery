import React from "react";
import { Platform, Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CartBadge from "../components/NavigationComponents/CartBadge";
import TabBarIcon from "../components/TabBarIcon";
import Colors from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import CartScreen from "../screens/CartScreen";
import ProfileTabNavigator from "./ProfileTabNavigator";

const StackNavOptions = {
  header : null,
  headerTransparent: true
};

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    navigationOptions: { ...StackNavOptions }
  }
);

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `home` : "home"}
    />
  ),
};

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen
  },
  {
    navigationOptions: { ...StackNavOptions }
  }
);

SearchStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `search1` : `search1`}
    />
  ),
};

const CartStack = createStackNavigator(
  {
    Cart: CartScreen
  },
  {
    navigationOptions: { ...StackNavOptions }
  }
);


CartStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <CartBadge
      focused={focused}
      name={Platform.OS === "ios" ? `shoppingcart` : "shoppingcart"}
    />
  ),
};

const ProfileStack = ProfileTabNavigator;

ProfileStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `user` : `user`}
    />
  ),
};
export default createBottomTabNavigator(
  {
    HomeStack,
    SearchStack,
    CartStack,
    ProfileStack
  },
  {
    initialRouteName: "CartStack",
    tabBarOptions: {
      showLabel: false,
      style: {
        elevation : 26,
        borderTopColor: Colors.boxShadowColor,
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20
      }
    }
  }
);
