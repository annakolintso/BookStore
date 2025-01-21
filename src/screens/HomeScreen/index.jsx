import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from "../../components/Typography";
import { useDispatch, useSelector } from 'react-redux';
import themeSettings from "../../../theme";
import { getBooks, getCover } from '../../../store/book/booksInfo/thunks';

const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  if (loading) return (<Typography text={"Завантаження.."} style={styles.loading} />);
  if (error) return (<Typography text={error} style={styles.error} />);
  return (
    <View style={styles.view}>
      {list?.map(book => (
        <>
          <Typography
            text={JSON.stringify(book.title)}
            style={styles.description}
          />

        </>
      ))}

    </View>
  )
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 250
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 48,
    paddingLeft: 20,
    paddingRight: 20,
  },
  background: {
    width: '100%',
  },
  description: {
    marginBottom: 87,
    color: themeSettings.palette.baseColors.secondary
  },
  logo: {
    marginBottom: 20,
    width: 136,
    height: 136
  },
});

export default WelcomeScreen;