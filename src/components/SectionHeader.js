import React from 'react';

// Core
import {StyleSheet, Text, View} from 'react-native';

// Utils
import PropTypes from 'prop-types';
import {genericStyles, getThemeColors, fonts, metrics} from '../utils';

// Redux
import {useSelector} from 'react-redux';

/**
 * @description basic section header container
 * @param {string} title
 */
function SectionHeader({title}) {
  const {themeColorType} = useSelector(state => state.themes);
  const colors = getThemeColors(themeColorType);
  const {textStyle} = fonts;
  return (
    <View style={[styles.headerContainer, {backgroundColor: colors.primary}]}>
      <Text style={[textStyle.sectionTitle, {color: colors.textSecondaryAlt}]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
  headerContainer: {
    justifyContent: 'center',
    height: metrics.section,
    paddingLeft: metrics.paddingLeft,
  },
});

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionHeader;
