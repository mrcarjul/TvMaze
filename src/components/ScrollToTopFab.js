import React from 'react';

// Core
import {StyleSheet, TouchableOpacity} from 'react-native';

// External Libs
import AntDesign from 'react-native-vector-icons/AntDesign';

// Utils
import PropTypes from 'prop-types';
import {getThemeColors, genericStyles, metrics} from '../utils';

// Redux
import {useSelector} from 'react-redux';

/**
 * @description Fab button to scroll to top
 * @param {React.Ref} flatListRef
 */
function ScrollToTopFab({flatListRef}) {
  const {error, shows} = useSelector(state => state.shows);
  const {themeColorType} = useSelector(state => state.themes);
  const colors = getThemeColors(themeColorType);

  const onPressFab = () => {
    if (!error) {
      flatListRef?.current?.scrollToIndex({index: 0, animated: true});
    }
  };

  if (shows.length === 0) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[
        styles.centerContents,
        styles.fabContainer,
        styles.shadows,
        {backgroundColor: colors.primary},
      ]}
      onPress={onPressFab}>
      <AntDesign name="arrowup" color={colors.textAlt} size={metrics.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
  fabContainer: {
    borderRadius: 25,
    bottom: 30,
    height: 50,
    position: 'absolute',
    right: 30,
    width: 50,
    zIndex: 99,
  },
});

ScrollToTopFab.propTypes = {
  flatListRef: PropTypes.object,
};

export default ScrollToTopFab;
