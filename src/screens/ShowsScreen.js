import React, {useState, useEffect} from 'react';

// Core
import {FlatList, StyleSheet, Text, View} from 'react-native';

// Personalized components
import {ListLoader, Show} from '../components';

// Utils
import {genericStyles} from '../utils';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {getShowsByPageAction} from '../redux/actions/shows';

/**
 * @description The purpose of the screen is to be the main screen to display shows list
 */
function ShowsScreen() {
  const {error, errorMsg, fetching, shows, page} = useSelector(
    state => state.shows,
  );
  const dispatch = useDispatch();

  const requestShows = () => {
    dispatch(getShowsByPageAction(page));
  };

  /**
   * @description on Screen Mount request shows
   */
  useEffect(requestShows, []);

  return (
    <View style={styles.container}>
      <Text>Shows Screen</Text>
      <FlatList
        horizontal={false}
        data={shows}
        keyExtractor={show => show._id}
        renderItem={({item, index}) => (
          <Show poster={item.image} name={item.name} />
        )}
        onEndReached={requestShows}
        ListFooterComponent={() => <ListLoader fetching={fetching} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
  imageStyle: {
    height: 295,
    width: 210,
  },
  showContainer: {
    paddingVertical: 15,
  },
});

export default ShowsScreen;
