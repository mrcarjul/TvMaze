import React from 'react';

// Core
import {Image, StyleSheet, Text, View} from 'react-native';

// External libs
import FastImage from 'react-native-fast-image';

// Utils
import {fonts, genericStyles, metrics} from '../utils';

class Show extends React.PureComponent {
  render() {
    const {colors, name, poster} = this.props;
    const {textStyle} = fonts;
    return (
      <View
        style={[styles.centerContents, styles.shadows, styles.showContainer]}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={{uri: poster?.medium}}
          style={styles.imageStyle}
        />
        <View
          style={[
            styles.titleContainer,
            styles.centerContents,
            {backgroundColor: colors.background},
          ]}>
          <Text
            style={[
              styles.text,
              textStyle.description,
              {color: colors.textAlt},
            ]}>
            {name}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...genericStyles,
  imageStyle: {
    borderTopLeftRadius: metrics.radius,
    borderTopRightRadius: metrics.radius,
    height: metrics.width / 2 / metrics.imageRatio,
    width: metrics.width / 2,
  },
  showContainer: {
    marginVertical: 15,
  },
  text: {
    padding: 10,
  },
  titleContainer: {
    borderBottomLeftRadius: metrics.radius,
    borderBottomRightRadius: metrics.radius,
    minHeight: 100,
    width: metrics.width / 2,
  },
});

export default Show;
