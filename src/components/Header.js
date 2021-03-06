import React from 'react';

// Core
import {Platform, StyleSheet, Text, View} from 'react-native';

// Utils
import PropTypes from 'prop-types';
import {fonts, genericStyles, getThemeColors, metrics} from '../utils';

// Redux
import {useSelector} from 'react-redux';

/**
 * @description Basic Header component
 * @param {string} title
 */
function Header({title}) {
  const {themeColorType} = useSelector(state => state.themes);
  const colors = getThemeColors(themeColorType);
  const {textStyle} = fonts;

  return (
    <View
      style={[
        styles.headerContainer,
        styles.row,
        {backgroundColor: colors.primary},
      ]}>
      <View style={styles.container} />
      <View
        style={
          Platform.OS === 'ios'
            ? [styles.headerTitleContainer, styles.centerContents]
            : [styles.headerTitleContainer, styles.centerVertical]
        }>
        <Text
          style={[textStyle.centeredTitle, {color: colors.textSecondaryAlt}]}>
          {title}
        </Text>
      </View>
      <View style={styles.container} />
    </View>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
  centerVertical: {
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    height: metrics.section,
    width: metrics.width,
  },
  headerTitleContainer: {
    flex: 8,
  },
});

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
