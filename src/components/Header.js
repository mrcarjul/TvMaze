import React from 'react';

// Core
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';

// External Libs
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Navigation
import {useNavigation} from '@react-navigation/native';

// Utils
import PropTypes from 'prop-types';
import {fonts, genericStyles, getThemeColors, metrics} from '../utils';

// Redux
import {useSelector} from 'react-redux';

/**
 * @description Basic Header component
 * @param {boolean} canBack if true show back button
 * @param {string} title
 */
function Header({canBack, title}) {
  const {themeColorType} = useSelector(state => state.themes);
  const {goBack} = useNavigation();
  const colors = getThemeColors(themeColorType);
  const {textStyle} = fonts;

  return (
    <View style={[styles.headerContainer, styles.row, styles.centerContents]}>
      {canBack && (
        <TouchableNativeFeedback onPress={goBack}>
          <View style={[styles.centerContents, styles.backButton]}>
            <MaterialIcons
              color={colors.text}
              name="arrow-back"
              size={metrics.icon}
            />
          </View>
        </TouchableNativeFeedback>
      )}
      <View
        style={
          Platform.OS === 'ios'
            ? [styles.headerTitleContainer, styles.centerContents]
            : [styles.headerTitleContainer, styles.centerVertical]
        }>
        <Text style={[textStyle.centeredTitle, {color: colors.text}]}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
  backButton: {
    flex: 1,
  },
  centerVertical: {
    justifyContent: 'center',
  },
  headerContainer: {
    height: metrics.section,
  },
  headerTitleContainer: {
    flex: 9,
  },
});

Header.propTypes = {
  canBack: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Header;
