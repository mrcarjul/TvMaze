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
 * @param {boolean} centered
 * @param {string} title
 */
function SectionHeader({centered, title}) {
  const {themeColorType} = useSelector(state => state.themes);
  const colors = getThemeColors(themeColorType);
  const {textStyle} = fonts;
  const {centeredSectionTitle, sectionTitle} = textStyle;
  const headerTextStyle = centered ? centeredSectionTitle : sectionTitle;
  return (
    <View style={[styles.headerContainer, {backgroundColor: colors.primary}]}>
      <Text style={[headerTextStyle, {color: colors.textSecondaryAlt}]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
  headerContainer: {
    justifyContent: 'center',
    minHeight: metrics.section,
    padding: metrics.padding,
  },
});

SectionHeader.propTypes = {
  centered: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default SectionHeader;
