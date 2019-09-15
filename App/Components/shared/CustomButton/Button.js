import React from "react";
import { TouchableNativeFeedback, View, Text } from "react-native";

const getSize = size => {
  switch (size) {
    case "SM":
      return 38;
    case "MD":
      return 45;
    case "LG":
      return 52;
    default:
      return 45;
  }
};

const getColorObj = (color, backgroundColor) => ({
  backgroundColor,
  color
});
const getColor = theme => {
  switch (theme) {
    case "primary":
      return getColorObj("#fff", "#00B624");
    default:
      return getColorObj("#fff", "#00B624");
  }
};

const CustomButton = ({
  style,
  theme = "primary",
  size = "MD",
  title,
  textStyles = {},
  ...otherProps
}) => {
  return (
    <TouchableNativeFeedback
      {...otherProps}
      background={TouchableNativeFeedback.SelectableBackground()}
      style={{
        width: "100%",
        borderWidth: 0
      }}
    >
      <View
        style={{
          height: getSize(size),
          borderWidth: 0,
          marginTop: 20,
          borderRadius: 3,
          width: "100%",
          fontSize: 20,
          paddingLeft: 15,
          paddingRight: 15,
          ...getColor(theme),
          alignItems: "center",
          justifyContent: "center",
          ...style
        }}
      >
        <Text style={{ fontSize: 20, ...getColor(theme), ...textStyles }}>
          {title}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CustomButton;
