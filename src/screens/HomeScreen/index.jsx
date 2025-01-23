import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '../../components/Typography';
import themeSettings from '../../../theme';
import { getBooks } from '../../../store/book/booksInfo/thunks';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  if (loading) return (<Typography text={'Завантаження..'} style={styles.loading} />);
  if (error) return (<Typography text={error} style={styles.error} />);

  return (
    <View style={styles.view}>
      <FlatList
        data={list}
        numColumns={2}
        keyExtractor={(item) => item?.key}
        contentContainerStyle={styles.bookList}
        columnWrapperStyle={styles.bookWrapper}
        renderItem={({ item }) => {
          return (
            <TouchableHighlight onPress={() => navigation.navigate('Product', { key: item.key })} style={styles.bookContainer}>
              <View style={styles.bookView}>
                <Image
                  source={require('./../../../assets/images/book_cover2.png')}
                  style={{ ...styles.background }}
                />
                <View style={styles.bookInfo}>
                  <Typography
                    text={item.title}
                    style={styles.title}
                  />
                  <Typography
                    text={item?.author_name?.[0]}
                    style={styles.author}
                  />
                  <Typography
                    text={'$25.00'}
                    style={styles.price}
                  />
                </View>
              </View>
            </TouchableHighlight>
          )
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 130,
  },
  bookWrapper: {
    justifyContent: 'space-between',
  },
  bookView: {
    flex: 1,
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

export default HomeScreen;