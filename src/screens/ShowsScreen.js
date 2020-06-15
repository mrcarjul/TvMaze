import React, {useCallback, useEffect, useRef} from 'react';

// Core
import {FlatList, StyleSheet, Text, View} from 'react-native';

// Personalized components
import {ListLoader, SearchInput, ScrollToTopFab, Show} from '../components';

// Utils
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
  const {error, errorMsg, fetching, shows, page} = useSelector(
    state => state.shows,
  );
  const {themeColorType} = useSelector(state => state.themes);
  const dispatch = useDispatch();
  const colors = getThemeColors(themeColorType);
  const {textStyle} = fonts;

  const requestShows = useCallback(() => {
    dispatch(getShowsByPageAction(0));
  }, [dispatch]);

  const requestMoreShows = useCallback(() => {
    dispatch(getShowsByPageAction(page));
  }, [dispatch, page]);

  const getItemLayout = useCallback((data, index) => {
    return {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index};
  }, []);

  const getKey = ({id}) => id;

  const renderItem = useCallback(
    ({item}) => (
      <Show
        id={item.id}
        colors={colors}
        name={item.name}
        poster={item.image}
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
      <Text style={textStyle.centeredTitle}>Series</Text>
      <SearchInput />
      <View style={styles.container}>
        <FlatList
          data={shows}
          extraData={shows}
          getItemLayout={getItemLayout}
          initialNumToRender={10}
          keyExtractor={getKey}
          maxToRenderPerBatch={10}
          onEndReached={requestMoreShows}
          renderItem={renderItem}
          ref={flatListRef}
          windowSize={5}
        />
        {error && (
          <View style={[styles.container, styles.centerContents]}>
            <Text style={textStyle.normal}>{errorMsg}</Text>
          </View>
        )}
        <ListLoader fetching={fetching} />
        <ScrollToTopFab flatListRef={flatListRef} />
      </View>
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
