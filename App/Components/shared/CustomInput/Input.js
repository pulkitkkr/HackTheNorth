import React from "react";
import { TextInput } from "react-native";

const CustomTextinput = ({ style, ...otherProps }) => {
  return (
    <TextInput
      {...otherProps}

      style={{
        height: 45,
        borderWidth: 0,
        backgroundColor: "#ffffffB8",
        width: "100%",
        borderRadius: 3,
        fontSize: 20,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 20,
        ...style
      }}
    />
  );
};

export default CustomTextinput;
