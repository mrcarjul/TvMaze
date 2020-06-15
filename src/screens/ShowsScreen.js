import React, {useCallback, useEffect, useRef} from 'react';

// Core
import {FlatList, StyleSheet, Text, View} from 'react-native';

// Personalized components
import {
  Empty,
  Footer,
  Header,
  ListLoader,
  SearchInput,
  ScrollToTopFab,
  ShowCard,
} from '../components';

// Utils
import PropTypes from 'prop-types';
import {fonts, getThemeColors, genericStyles, metrics} from '../utils';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {getShowsByPageAction} from '../redux/actions/shows';

const ITEM_HEIGHT = metrics.width / 2 / metrics.imageRatio + 150;

/**
 * @description The purpose of the screen is to be the main screen to display shows list
 */
function ShowsScreen({navigation}) {
  const flatListRef = useRef(null);
  const {fetching, shows, page} = useSelector(state => state.shows);
  const {themeColorType} = useSelector(state => state.themes);
  const dispatch = useDispatch();
  const colors = getThemeColors(themeColorType);

  const requestShows = useCallback(() => {
    dispatch(getShowsByPageAction(0));
  }, [dispatch]);

  const requestMoreShows = useCallback(() => {
    dispatch(getShowsByPageAction(page + 1));
  }, [dispatch, page]);

  const getItemLayout = useCallback((data, index) => {
    return {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index};
  }, []);

  const getKey = useCallback(({id}) => `Show-${id}`, []);

  const renderItem = useCallback(
    ({item}) => (
      <ShowCard
        id={item?.id}
        colors={colors}
        name={item?.name}
        poster={item?.image?.medium}
        navigation={navigation}
      />
    ),
    [colors, navigation],
  );

  /**
   * @description on Screen Mount request shows
   */
  useEffect(requestShows, []);

  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundAlt}]}>
      <Header title="Series" />
      <SearchInput flatListRef={flatListRef} />
      <View style={styles.container}>
        <FlatList
          ListEmptyComponent={Empty}
          data={shows}
          extraData={shows}
          getItemLayout={getItemLayout}
          initialNumToRender={10}
          keyExtractor={getKey}
          maxToRenderPerBatch={10}
          onEndReached={
            shows.length !== 0 && shows.length % 240 === 0
              ? requestMoreShows
              : null
          }
          renderItem={renderItem}
          ref={flatListRef}
          windowSize={5}
        />
        <ListLoader fetching={fetching} />
        <ScrollToTopFab flatListRef={flatListRef} />
      </View>
      <Footer />
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

ShowsScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ShowsScreen;
