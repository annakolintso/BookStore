import React from "react";
import { Text } from "react-native";
import theme from "../../../theme";

export default ({ type, text, style: additionalStyles, linesOfText }) => {

  if (!text) {
    return;
  }

  if (!type) {
    type = "body";
  }

  return (
    <Text
      numberOfLines={linesOfText}
      ellipsizeMode="tail"
      style={{
        ...theme.typography.textStyles[type],
        ...additionalStyles,
      }}
    >
      {text}
    </Text>
  );
};
