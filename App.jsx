import React, { useCallback, useRef } from 'react';
import { StatusBar, StyleSheet, View, Text, Button } from 'react-native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { Provider } from 'react-redux';
import Navigation from './src/screens/Navigation';
import { store } from './store';
import { AuthProvider } from "./src/contexts/AuthContext";
// import { TranslatorProvider } from 'react-translate';
// import translations from './translations';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const scopeOfFonts = {
  'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
  'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
  'OpenSans-Medium': require('./assets/fonts/OpenSans-Medium.ttf'),
  'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
  'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  'OpenSans-ExtraBold': require('./assets/fonts/OpenSans-ExtraBold.ttf')
};

const App = () => {
  const [loaded, error] = useFonts(scopeOfFonts);
  const bottomSheetModalRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        {/* <TranslatorProvider translations={translations}> */}

        <AuthProvider>
          <BottomSheetModalProvider>
            <StatusBar style="auto" />
            <Navigation />


            <Button
              onPress={handlePresentModalPress}
              title="Modal"
              color="white"
            />
            <BottomSheetModal
              ref={bottomSheetModalRef}
              onChange={handleSheetChanges}
            >
              <BottomSheetView style={styles.contentContainer}>
                <Text>🎉</Text>
              </BottomSheetView>
            </BottomSheetModal>
          </BottomSheetModalProvider>
        </AuthProvider>

        {/* </TranslatorProvider> */}
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
});

export default App;