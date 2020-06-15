import React, {useEffect, useState, useCallback} from 'react';

// Core
import {ActivityIndicator, StyleSheet, TextInput, View} from 'react-native';

// External Libs
import AntDesign from 'react-native-vector-icons/AntDesign';

// Hooks
import {usePrevious, useDebouncedCallback} from '../hooks';

// Utils
import PropTypes from 'prop-types';
import {fonts, getThemeColors, genericStyles, metrics} from '../utils';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getShowsByPageAction,
  getShowsByQueryAction,
} from '../redux/actions/shows';

/**
 * @description Search input in charge of request data based in query or reset flatlist
 * @param {React.Ref} flatListRef
 */
function SearchInput({flatListRef}) {
  const [query, setQuery] = useState('');
  const prevQuery = usePrevious(query);
  const {error, fetching} = useSelector(state => state.shows);
  const {themeColorType} = useSelector(state => state.themes);
  const dispatch = useDispatch();

  const colors = getThemeColors(themeColorType);
  const {textStyle} = fonts;

  const requestShows = useCallback(() => {
    if (!error) {
      flatListRef?.current?.scrollToIndex({index: 0, animated: true});
    }
    dispatch(getShowsByPageAction(0));
  }, [dispatch, error, flatListRef]);

  const onSearch = useCallback(() => {
    if (!error) {
      flatListRef?.current?.scrollToIndex({index: 0, animated: true});
    }
    dispatch(getShowsByQueryAction(query));
  }, [dispatch, error, flatListRef, query]);

  const [debouncedSearch] = useDebouncedCallback(onSearch, 200);
  const [debouncedSearchReset] = useDebouncedCallback(requestShows, 200);

  useEffect(() => {
    if (query.length > 3 && query.length % 2 === 0) {
      debouncedSearch();
    }
    if (query?.length === 0 && prevQuery?.length > query?.length) {
      debouncedSearchReset();
    }
    return;
  }, [debouncedSearch, debouncedSearchReset, onSearch, prevQuery, query]);

  return (
    <View
      style={[
        styles.inputContainer,
        styles.row,
        {borderColor: colors.backgroundSecondaryAlt},
      ]}>
      <TextInput
        style={[textStyle.description, styles.input, {color: colors.text}]}
        value={query}
        placeholder="Search a show..."
        onChangeText={setQuery}
      />
      <View style={styles.iconContainer}>
        {fetching ? (
          <ActivityIndicator
            size="small"
            color={colors.backgroundSecondaryAlt}
          />
        ) : (
          <AntDesign
            name="search1"
            color={colors.backgroundSecondaryAlt}
            size={metrics.icon}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
  iconContainer: {
    flex: 1,
  },
  input: {
    marginHorizontal: metrics.marginHorizontal,
    flex: 9,
    textAlign: 'left',
  },
  inputContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: metrics.radius,
    margin: metrics.margin,
    height: metrics.section,
  },
});

SearchInput.propTypes = {
  flatListRef: PropTypes.object,
};

export default SearchInput;
