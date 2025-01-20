import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import themeSettings from "../../../theme";

const CustomButton = ({ text, icon, iconMargin, onPress, onLongPress, style, textStyle, disabled }) => {
  if (!text) return null;

  const disabledButtonStyle = disabled ? styles.disabledButton : {};

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      style={{
        ...styles.button,
        ...style,
        ...disabledButtonStyle,
      }}
    >
      <Text style={{
        ...styles.buttonText,
        ...textStyle,
      }}>
        {text}
      </Text>
      {icon && <Image source={icon} style={{ ...iconMargin, width: 83, height: 22 }} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: themeSettings.palette.baseColors.black,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: themeSettings.palette.baseColors.black,
  },
  buttonText: {
    color: themeSettings.palette.baseColors.light,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 22,
  },
});

export default CustomButton;
