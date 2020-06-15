import React, {useCallback} from 'react';

// Core
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// Assets
import images from '../assets/images';

// External Libs
import FastImage from 'react-native-fast-image';

// Utils
import {fonts, genericStyles, getThemeColors, metrics} from '../utils';

// Redux
import {useSelector} from 'react-redux';

const TvMazeUrl = 'https://www.tvmaze.com/';

/**
 * @description Basic Footer component
 */
function Footer() {
  const {themeColorType} = useSelector(state => state.themes);
  const colors = getThemeColors(themeColorType);
  const {textStyle} = fonts;

  const onPressTvMaze = useCallback(async () => {
    const supported = await Linking.canOpenURL(TvMazeUrl);

    if (supported) {
      await Linking.openURL(TvMazeUrl);
    }
  }, []);

  return (
    <View style={[styles.footerContainer, styles.row]}>
      <View style={[styles.footerTextContainer, styles.centerContents]}>
        <Text style={[textStyle.description, {color: colors.text}]}>
          Information provided by TvMaze
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.container, styles.centerContents]}
        onPress={onPressTvMaze}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={images.logo}
          style={styles.imageStyle}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
  centerVertical: {
    justifyContent: 'center',
  },
  footerContainer: {
    height: metrics.section,
    width: metrics.width,
  },
  footerTextContainer: {
    flex: 2,
  },
  imageStyle: {
    aspectRatio: 3,
    width: metrics.width * 0.2,
  },
});

export default Footer;
