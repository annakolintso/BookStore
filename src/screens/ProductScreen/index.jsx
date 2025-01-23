import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Typography from '../../components/Typography';
import themeSettings from '../../../theme';

const ProductScreen = ( { route } ) => {
  if (!route?.params) return;
  const { params: { key } } = route;
  const { list } = useSelector((state) => state.books);
  const bookDetail = list.find(book => book.key === key);

  return (
    <View style={styles.view}>
      <View style={styles.bookContainer}>
          <Image
            source={require('./../../../assets/images/book_cover2.png')}
            style={{ ...styles.background }}
          />
          <View style={styles.bookInfo}>
            <Typography
              text={bookDetail.title}
              style={styles.title}
            />
            <Typography
              text={bookDetail?.author_name?.[0]}
              style={styles.author}
            />
            <Typography
              text={'$25.00'}
              style={styles.price}
            />
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 130,
  },
  bookContainer: {
    width: '48%',
    backgroundColor: '#B8B8B8',
    borderRadius: 8,
  },
  background: {
    marginHorizontal: 'auto',
    marginTop: 11,
  },
  title: {
    marginBottom: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
    fontFamily: 'OpenSans_Bold'
  },
  author: {
    color: '#fff',
    fontSize: 11,
    marginBottom: 14
  },
  price: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 700,
    fontFamily: 'OpenSans_Bold'
  },
  bookInfo: {
    backgroundColor: themeSettings.palette.baseColors.black,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    minHeight: 150
  }
});

export default ProductScreen;