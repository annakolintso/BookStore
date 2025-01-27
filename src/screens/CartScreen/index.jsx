import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '../../components/Typography';
import theme from '../../../theme';

const CartScreen = () => {
  return (
    <View style={styles.view}>
      <Typography
        text={'Cart'}
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

export default CartScreen;