import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import LaunchScreen from "../Containers/LaunchScreen/LaunchScreen";
import HomeScreen from "../Containers/HomeScreen/HomeScreen";
import UserProfileScreen from "../Containers/UserProfileScreen/UserProfileScreen";
import CouponsScreen from "../Containers/CouponsScreen/CouponsScreen";

import styles from "./Styles/NavigationStyles";

const TabNavigation = createBottomTabNavigator({
  Home: HomeScreen,
  Coupons: CouponsScreen,
  UserProfile: UserProfileScreen
});

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    HomeScreen: {
      screen: TabNavigation
    }
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "LaunchScreen",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default createAppContainer(PrimaryNav);
