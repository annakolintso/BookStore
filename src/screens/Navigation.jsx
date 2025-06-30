import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from "./WelcomeScreen";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
// import CartScreen from "./CartScreen";
// import CategoryScreen from "./CategoryScreen";
import AccountScreen from "./AccountScreen";
import ProductScreen from "./ProductScreen";
import LocationScreen from "./LocationScreen";
import QrScreen from "./QrScreen";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import themeSettings from './../../theme';
import { useAuth } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabNavBarSettings = {
  HomeScreen: {
    icon: Entypo,
    iconName: 'home',
    title: 'Home',
  },
  LocationScreen: {
    icon: Entypo,
    iconName: 'location-pin',
    title: 'Location',
  },
  QrScreen: {
    icon: MaterialIcons,
    iconName: 'qr-code',
    title: 'Qr',
  },
  AccountScreen: {
    icon: MaterialIcons,
    iconName: 'account-box',
    title: 'Account',
  },
};

const TabsNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          const settings = tabNavBarSettings[route.name];
          if (!settings) return null;

          const IconComponent = settings.icon;
          const iconColor = focused ? 'white' : color;
          const backgroundColor = focused ? 'black' : 'transparent';
          return (
            <View style={[styles.iconContainer, { backgroundColor }]}>
              <IconComponent name={settings.iconName} size={16} color={iconColor} />
            </View>
          );
        },
        tabBarActiveTintColor: themeSettings.palette.baseColors.secondary,
        tabBarInactiveTintColor: themeSettings.palette.baseColors.gray,
        tabBarStyle: { height: 90, display: 'flex', alignItems: 'center', paddingVertical: 10, },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: tabNavBarSettings.HomeScreen.title
        }}
      />
      <Tab.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={{
          title: tabNavBarSettings.LocationScreen.title,
        }}
      />
      <Tab.Screen
        name="QrScreen"
        component={QrScreen}
        options={{
          title: tabNavBarSettings.QrScreen.title,
        }}
      />
      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          title: tabNavBarSettings.AccountScreen.title,
        }}
      />
    </Tab.Navigator>
  );
};

export default function Navigation() {
  const hideDefaultHeader = { headerShown: false };
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="TabsNavigation" component={TabsNavigation} options={hideDefaultHeader} />
            <Stack.Screen name="Home" component={HomeScreen} options={hideDefaultHeader} />
            <Stack.Screen name="Product" component={ProductScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={hideDefaultHeader} />
            <Stack.Screen name="Login" component={LoginScreen} options={hideDefaultHeader} />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  iconContainer: {
    width: 40,
    height: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});