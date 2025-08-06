import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert, Image, Text, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import Typography from '../../components/Typography';
import theme from '../../../theme';
import * as ImagePicker from 'expo-image-picker';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


const INJECTED_JAVASCRIPT = `
    localStorage.setItem('testKey', 'testValue');
    true;
`;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Use physical devices');
  }
}

const MediaScreen = () => {
  const webviewRef = useRef(null);
  const [image, setImage] = useState(null);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(undefined);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error) => setExpoPushToken(`${error}`));

    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

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
      <Button
        title="Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
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
