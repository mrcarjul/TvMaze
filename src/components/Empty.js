import React from 'react';

// Core
import {Text, View} from 'react-native';

// Utils
import {genericStyles, getThemeColors, fonts} from '../utils';

// Redux
import {useSelector} from 'react-redux';

/**
 * @description basic section header container
 * @param {boolean} centered if true centers text in header
 * @param {string} title
 */
function Empty() {
  const {error, errorMsg, fetching} = useSelector(state => state.shows);
  const {themeColorType} = useSelector(state => state.themes);
  const colors = getThemeColors(themeColorType);
  const {textStyle} = fonts;
  const {centeredSectionTitle} = textStyle;
  const headerTextStyle = centeredSectionTitle;
  return (
    <View style={genericStyles.container}>
      <Text style={[headerTextStyle, {color: colors.text}]}>
        {fetching
          ? 'Loading...'
          : error
          ? errorMsg
          : 'No information Available at the moment'}
      </Text>
    </View>
  );
}

export default Empty;
