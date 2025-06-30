import React, { useEffect, useState } from 'react';
import theme from '../../../theme';
import Typography from '../../components/Typography';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';


const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Access to geolocation is prohibited.');
        Alert.alert('Error', 'The application does not have permission to use geolocation');
        setLoading(false);
        return;
      }

      try {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        let addr = await Location.reverseGeocodeAsync({
          latitude: 50.4501,
          longitude: 30.5234
        });
        setAddress(addr[0]);
      } catch (e) {
        setErrorMsg('Failed to get geolocation');
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  return (
    <>
    <View style={styles.view}>
      <Typography
        text={'Location page'}
        type={'headline'}
        style={styles.pageTitle}
      />
    </View>
    {loading ? 
    <View style={styles.center}>
      <ActivityIndicator size="large" />
      <Typography text={'Loading...'} />
    </View> : 
    <View style={styles.container}>
      <Typography text={'Your address: '} />
      {errorMsg ? (
        <Typography text={errorMsg} style={styles.error} />
      ) : address && (<Typography text={`${address.city}, ${address.street}, ${address.region}, ${address.country}`} />)}
    </View>
    }
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 110,
  },
  pageTitle: {
    color: theme.palette.baseColors.black,
    marginBottom: 23
  },
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 16 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 10 
  },
  error: { 
    color: 'red', 
    textAlign: 'center' 
  },
});

export default LocationScreen;