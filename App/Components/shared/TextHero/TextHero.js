import React from "react";
import { View, Text } from "react-native";

export const TextHero = ({ title, subtitle }) => (
  <View>
    <Text>{title}</Text>
    <Text>{subtitle}</Text>
  </View>
);

export default TextHero;
