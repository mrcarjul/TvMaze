import React, {useState, useEffect} from 'react';

// Core
import {FlatList, StyleSheet, Text, View} from 'react-native';

// Personalized components
import {ListLoader, Show} from '../components';

// Utils
import {fonts, getThemeColors, genericStyles, metrics} from '../utils';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {getShowsByPageAction} from '../redux/actions/shows';

const ITEM_HEIGHT = metrics.width / 2 / metrics.imageRatio + 150;

/**
 * @description The purpose of the screen is to be the main screen to display shows list
 */
function ShowsScreen() {
  const {error, errorMsg, fetching, shows, page} = useSelector(
    state => state.shows,
  );
  const {themeColorType} = useSelector(state => state.themes);
  const dispatch = useDispatch();
  const colors = getThemeColors(themeColorType);
  const {textStyle} = fonts;

  const requestShows = () => {
    dispatch(getShowsByPageAction(0));
  };

  const requestMoreShows = () => {
    dispatch(getShowsByPageAction(page));
  };

  /**
   * @description on Screen Mount request shows
   */
  useEffect(requestShows, []);

  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundAlt}]}>
      <Text style={textStyle.centeredTitle}>Shows</Text>
      <FlatList
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        data={shows}
        keyExtractor={show => show.id}
        renderItem={({item}) => (
          <Show
            index={item.id}
            colors={colors}
            name={item.name}
            poster={item.image}
          />
        )}
        onEndReached={requestMoreShows}
        getItemLayout={(data, index) => {
          return {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index};
        }}
        windowSize={5}
      />
      {fetching && <ListLoader fetching={fetching} />}
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
