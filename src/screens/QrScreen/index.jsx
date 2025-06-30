import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import Typography from '../../components/Typography';
import theme from '../../../theme';
import { CameraView, useCameraPermissions } from 'expo-camera';

const QRScannerScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert('QR Code Data', `Type: ${type}\nData: ${data}`);
  };

  return (
    <>
      <View style={styles.view}>
        <Typography
          text={'Cart page'}
          type={'headline'}
          style={styles.pageTitle}
        />
      </View>
      {!permission ? <View><Typography text={'Check permissions...'} /></View> : 
      !permission.granted ? 
      <View style={styles.centered}>
        <Typography text={'No access to camera'} />
        <Button title="Allow access" onPress={requestPermission} />
      </View> : 
      <View style={styles.container}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />
        {scanned && (
          <View style={styles.buttonContainer}>
            <Button title="Scan again" onPress={() => setScanned(false)} />
          </View>
        )}
    </View>}
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
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
});

export default QRScannerScreen;