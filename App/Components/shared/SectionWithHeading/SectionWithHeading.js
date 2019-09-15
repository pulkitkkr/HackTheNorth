import React from "react";
import { View, Text } from "react-native";

export const SectionWithHeading = ({ title, children, textStyle = {} }) => (
  <View
    style={{
      paddingTop: 20,
      paddingBottom: 20,
      width: "100%",
      minHeight: 150
    }}
  >
    <Text
      style={{ color: "#009000", fontSize: 22, marginBottom: 20, ...textStyle }}
    >
      {title}
    </Text>
    {children}
  </View>
);

export default SectionWithHeading;
