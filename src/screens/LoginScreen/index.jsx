import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from './../../components/Button';
import Typography from './../../components/Typography';
import theme from '../../../theme';
import { useAuth } from '../../contexts/AuthContext';
import { fakeLoginCredentials } from '../../../constants/fakeLoginCredentials';

const LoginScreen = ({ route }) => {
  if (!route?.params) return;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const { setIsAuthenticated } = useAuth();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if (email === fakeLoginCredentials.requiredLogin && password === fakeLoginCredentials.requiredPassword) {
      setIsAuthenticated(true);
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name={'arrow-left'}
            size={24}
            color="black"
            style={styles.back}
            onPress={() => navigation.goBack()}
          />
          <Typography
            text={'Get Started'}
            type={'headline'}
            style={styles.title}
          />
        </View>
        <Typography
          text={'Please fill your details to login.'}
          style={styles.formDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          inlineImageLeft="eye"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.inputPass]}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            inlineImageLeft="search_icon"
            autoCapitalize="none"
            onChangeText={setPassword}
          />
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#252525"
            style={styles.passwordIcon}
            onPress={toggleShowPassword}
          />
        </View>
        <Button
          text={'Login'}
          onPress={handleLogin}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 66,
    paddingLeft: Platform.OS === 'ios' ? 20 : 10,
    paddingRight: Platform.OS === 'ios' ? 20 : 10,
    paddingBottom: 39
  },
  back: {
    position: 'absolute',
    top: 5,
    zIndex: 1
  },
  topView: {
    flex: 1
  },
  header: {
    position: 'relative',
    marginBottom: 72
  },
  formDescription: {
    fontSize: 16,
    lineHeight: '32px',
    marginBottom: 32,
    color: theme.palette.baseColors.secondary
  },
  title: {
    textAlign: 'center',
    color: theme.palette.baseColors.black
  },
  passwordContainer: {
    position: 'relative'
  },
  passwordIcon: {
    position: 'absolute',
    top: 14,
    right: 16
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10
  },
  inputPass: {
    paddingRight: 45
  }
});

export default LoginScreen;