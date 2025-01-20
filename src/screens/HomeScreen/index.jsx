import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Typography from "../../components/Typography";
import themeSettings from "../../../theme";

const WelcomeScreen = () => (
  <View style={styles.view}>
    <View style={styles.container}>
      <Image source={require("./../../../assets/images/icon.png")}
        style={{ ...styles.logo }} />
      <Typography
        text={"HOME"}
        style={styles.description}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 48,
    paddingLeft: 20,
    paddingRight: 20,
  },
  background: {
    width: '100%',
  },
  description: {
    marginBottom: 87,
    color: themeSettings.palette.baseColors.secondary
  },
  logo: {
    marginBottom: 20,
    width: 136,
    height: 136
  },
});

export default WelcomeScreen;