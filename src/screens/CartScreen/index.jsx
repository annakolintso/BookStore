import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '../../components/Typography';
import theme from '../../../theme';

const HomeScreen = () => {
  return (
    <View style={styles.view}>
      <Typography
        text={'Cart page'}
        type={'headline'}
        style={styles.pageTitle}
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