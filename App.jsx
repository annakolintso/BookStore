import React from 'react';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { Provider } from 'react-redux';
import Navigation from './src/screens/Navigation';
import { store } from './store';
import { AuthProvider } from "./src/contexts/AuthContext";
// import { TranslatorProvider } from 'react-translate';
// import translations from './translations';

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

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      {/* <TranslatorProvider translations={translations}> */}
        <AuthProvider>
          <StatusBar style="auto" />
          <Navigation />
        </AuthProvider>
      {/* </TranslatorProvider> */}
    </Provider>
  );
};

export default App;