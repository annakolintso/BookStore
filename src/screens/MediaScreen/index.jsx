import React, { useRef, useState } from 'react';
import { View, StyleSheet, Button, Alert, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import Typography from '../../components/Typography';
import theme from '../../../theme';
import * as ImagePicker from 'expo-image-picker';


const INJECTED_JAVASCRIPT = `
    localStorage.setItem('testKey', 'testValue');
    true;
`;

const MediaScreen = () => {
  const webviewRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleMessage = (event) => {
    const data = event.nativeEvent.data;
    try {
      const parsed = JSON.parse(data);
      if (parsed.type === 'media') {
        Alert.alert('Media file received', `Name: ${parsed.name}\nType: ${parsed.mediaType}`);
        return;
      }
    } catch (e) { }
    Alert.alert('Data from localStorage', data);
  };

  const injectDataToLocalStorage = () => {
    const script = `
      try {
    localStorage.setItem('myKey', 'myValue');
    alert('Data saved to localStorage');
    var value = localStorage.getItem('myKey');
    alert('Value from localStorage: ' + value);
    true;
  } catch (e) {
    alert(e);
    true;
  }
    `;
    webviewRef.current?.injectJavaScript(script);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.view}>
      <Typography
        text={'WebView page'}
        type={'headline'}
        style={styles.pageTitle}
      />
      <Button title="Save to localStorage" onPress={injectDataToLocalStorage} />
      <WebView
        ref={webviewRef}
        source={{ uri: "https://www.yakaboo.ua/?srsltid=AfmBOooYEiLaR1fgQ8fE24MzpZM6eeK_LALsfHehHgD3Ux5D-ZqK4MOZ" }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        originWhitelist={["*"]}
        style={styles.webview}
      />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
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
  container: { flex: 1, paddingTop: 60 },
  title: { textAlign: 'center', marginBottom: 10 },
  webview: { flex: 1, marginHorizontal: 10, borderRadius: 8, overflow: 'hidden' },
  image: {
    width: 200,
    height: 200,
  },
});

export default MediaScreen;
