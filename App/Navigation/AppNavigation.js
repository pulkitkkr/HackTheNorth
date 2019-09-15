import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import LaunchScreen from "../Containers/LaunchScreen/LaunchScreen";
import HomeScreen from "../Containers/HomeScreen/HomeScreen";
import UserProfileScreen from "../Containers/UserProfileScreen/UserProfileScreen";
import { View, Text } from "react-native";

import styles from "./Styles/NavigationStyles";

const GenerateScreen = ({ text }) => (
  <View>
    <Text>{text}</Text>
  </View>
);

const TabNavigation = createBottomTabNavigator({
  Home: HomeScreen,
  Second: props => <GenerateScreen text={"Second"} />,
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
