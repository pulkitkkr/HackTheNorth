import React from "react";
import { View, Text } from "react-native";

export const TextHero = ({ title, subtitle }) => (
  <View
    style={{
      width: "100%",
      height: 200,
      backgroundColor: "#12422A",
      paddingTop: 25,
      paddingRight: 15,
      paddingLeft: 15
    }}
  >
    <Text style={{ fontSize: 28, fontWeight: "700", color: "#fff" }}>
      {title}
    </Text>
    <Text
      style={{
        fontSize: 22,
        fontWeight: "300",
        color: "#fff",
        marginTop: 20
      }}
    >
      {subtitle}
    </Text>
  </View>
);

export default TextHero;
