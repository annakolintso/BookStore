import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '../../components/Typography';
import theme from '../../../theme';
import Button from './../../components/Button';
import { useAuth } from "./../../contexts/AuthContext";

const HomeScreen = () => {
  const { logout } = useAuth();

  return (
    <View style={styles.view}>
      <Typography
        text={'Account page'}
        type={'headline'}
        style={styles.pageTitle}
      />
      <Button
        text={'Logout'}
        onPress={() => logout()}
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
});

export default HomeScreen;