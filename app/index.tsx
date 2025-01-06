import React from "react";
import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import { SplashScreen } from "expo-router";

const scopeOfFonts = {
  "OpenSans-Light": require("../assets/fonts/OpenSans-Light.ttf"),
  "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
  "OpenSans-Medium": require("../assets/fonts/OpenSans-Medium.ttf"),
  "OpenSans-SemiBold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
  "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
  "OpenSans-ExtraBold": require("../assets/fonts/OpenSans-ExtraBold.ttf"),
};


export default function Index() {
  const [loaded, error] = useFonts(scopeOfFonts);

    React.useEffect(() => {
      if (loaded || error) {
        SplashScreen.hideAsync();
      }
    }, [loaded, error]);
  
    if (!loaded && !error) {
      return null;
    }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}