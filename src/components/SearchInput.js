import React, {useEffect, useState, useCallback} from 'react';

// Core
import {ActivityIndicator, StyleSheet, TextInput, View} from 'react-native';

// External Libs
import AntDesign from 'react-native-vector-icons/AntDesign';

// Hooks
import {useDebouncedCallback} from '../hooks';

// Utils
import {fonts, getThemeColors, genericStyles, metrics} from '../utils';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {getShowsByQueryAction} from '../redux/actions/shows';

/**
 * @description Fab button to scroll to top
 * @param {React.Ref} flatListRef
 */
function SearchInput() {
  const [query, setQuery] = useState('');
  const {fetching} = useSelector(state => state.shows);
  const {themeColorType} = useSelector(state => state.themes);
  const dispatch = useDispatch();

  const colors = getThemeColors(themeColorType);
  const {textStyle} = fonts;

  const onSearch = useCallback(() => {
    dispatch(getShowsByQueryAction(query));
  }, [dispatch, query]);

  const [debouncedSearch] = useDebouncedCallback(onSearch, 200);

  useEffect(() => {
    if (query.length > 3 && query.length % 2 === 0) {
      debouncedSearch();
    }
    return;
  }, [debouncedSearch, onSearch, query]);

  return (
    <View
      style={[
        styles.inputContainer,
        styles.row,
        {borderColor: colors.backgroundSecondaryAlt},
      ]}>
      <TextInput
        style={[textStyle.description, styles.input]}
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
    marginHorizontal: 10,
    flex: 9,
    textAlign: 'left',
  },
  inputContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: metrics.radius,
    margin: 10,
    height: metrics.section,
  },
});

export default SearchInput;
