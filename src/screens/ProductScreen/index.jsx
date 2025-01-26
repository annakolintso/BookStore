import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Typography from '../../components/Typography';
import themeSettings from '../../../theme';
import Button from './../../components/Button';

const ProductScreen = ({ route }) => {
  if (!route?.params) return (<Typography
    text={'No information found'}
    style={styles.info}
  />)
  const { params: { key } } = route;
  const { list } = useSelector((state) => state.books);
  const bookDetail = list?.find(book => book.key === key);

  return (
    <View style={styles.view}>
      <Typography
        text={bookDetail?.title}
        style={styles.title}
      />
      <View style={styles.bookContainer}>
        <Image
          source={require('./../../../assets/images/book_cover2.png')}
          style={styles.image}
        />
        <View style={styles.bookInfo}>
          <View style={styles.bookInfoItem}>
            <Typography
              text={'Author:'}
              style={styles.label}
            />
            <Typography
              text={bookDetail?.author_name?.[0]}
              style={styles.value}
            />
          </View>
          <View style={styles.bookInfoItem}>
            <Typography
              text={'Publish year:'}
              style={styles.label}
            />
            <Typography
              text={bookDetail?.publish_year?.[0]}
              style={styles.value}
            />
          </View>
          <View style={styles.bookInfoItem}>
            <Typography
              text={'Rating:'}
              style={styles.label}
            />
            <Typography
              text={'4.11/5'}
              style={styles.value}
            />
          </View>
          <View style={styles.bookInfoItem}>
            <Typography
              text={'Pricing:'}
              style={styles.label}
            />
            <Typography
              text={'$25.00'}
              style={styles.value}
            />
          </View>
          <Button text={'Add to Cart'} />
        </View>
      </View>
      <View>
        <Typography
          text={'Description:'}
          style={styles.value}
        />
        <Typography
          text={'Oscar Wilde’s only novel is the dreamlike story of a young man who sells his soul for eternal youth and beauty. In this celebrated work Wilde forged a devastating portrait of the effects of evil and debauchery on a young aesthete in late-19th-century England. Combining elements of the Gothic horror novel and decadent French fiction, the book centers on a striking premise: As Dorian Gray sinks into a life of crime and gross sensuality, his body retains perfect youth and vigor while his recently painted portrait grows day by day into a hideous record of evil'}
          style={styles.price}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  info: {
    marginTop: 40,
    marginLeft: 20,
    fontSize: 16
  },

  title: {
    marginBottom: 8,
    color: '#fff',
    fontSize: 24,
    fontWeight: 500,
    fontFamily: 'OpenSans_SemiBold',
    color: themeSettings.palette.baseColors.black,
  },
  image: {
    width: 138,
    height: 214,
    marginEnd: 20
  },
  bookContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20
  },
  bookInfoItem: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10
  },
  label: {
    fontSize: 14,
    marginRight: 7
  },
  value: {
    fontSize: 14,
    fontWeight: 500,
    fontFamily: 'OpenSans_SemiBold'
  },
  bookInfo: {
    flex: 1,
  }
});

export default ProductScreen;