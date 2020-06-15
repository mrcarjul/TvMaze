import React from 'react';

// Core
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// External libs
import FastImage from 'react-native-fast-image';

// Utils
import PropTypes from 'prop-types';
import {fonts, genericStyles, metrics} from '../utils';

// Redux
import {setShowId} from '../redux/actions/shows';

class Show extends React.PureComponent {
  onPressShow = () => {
    const {id, navigation} = this.props;
    setShowId(id);
    navigation.navigate('ShowDetail');
  };

  render() {
    const {colors, name, poster} = this.props;
    const {textStyle} = fonts;

    return (
      <TouchableOpacity
        onPress={this.onPressShow}
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
      </TouchableOpacity>
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

Show.propTypes = {
  colors: PropTypes.object,
  id: PropTypes.number,
  name: PropTypes.string,
  navigation: PropTypes.object,
  poster: PropTypes.string,
};

export default Show;
