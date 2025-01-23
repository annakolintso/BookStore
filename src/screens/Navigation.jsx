import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from "./WelcomeScreen";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import ProductScreen from "./ProductScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const hideDefaultHeader = { headerShown: false };

  // add tab navigation in the bottom
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={hideDefaultHeader} />
        <Stack.Screen name="Login" component={LoginScreen} options={hideDefaultHeader} />
        <Stack.Screen name="Home" component={HomeScreen} options={hideDefaultHeader} />
        <Stack.Screen name="Product" component={ProductScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}