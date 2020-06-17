import React from 'react';

// Core
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Assets
import images from '../assets/images';

// External libs
import FastImage from 'react-native-fast-image';
import {SharedElement} from 'react-navigation-shared-element';

// Utils
import PropTypes from 'prop-types';
import {fonts, genericStyles, metrics} from '../utils';

// Redux
import {setShowIdAction} from '../redux/actions/shows';
import {connect} from 'react-redux';

class ShowCard extends React.PureComponent {
  onSelectShow = () => {
    const {id, navigation, setShowId} = this.props;
    setShowId(id);
    navigation.navigate('ShowDetail', {show_id: id});
  };

  render() {
    const {colors, disabled, id, name, poster} = this.props;
    const {textStyle} = fonts;
    const image = poster ? {uri: poster} : images.show_image;

    return (
      <TouchableOpacity
        onPress={this.onSelectShow}
        style={[
          styles.centerContents,
          styles.shadows,
          styles.showContainer,
          {backgroundColor: colors.primary},
        ]}
        disabled={disabled}>
        <SharedElement id={`show.${id}`}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={image}
            style={[styles.imageStyle, {backgroundColor: colors.primary}]}
          />
        </SharedElement>
        <View style={[styles.titleContainer, styles.centerContents]}>
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
    borderBottomWidth: 0,
    height: PixelRatio.roundToNearestPixel(
      metrics.width / 1.5 / metrics.imageRatio,
    ),
    width: PixelRatio.roundToNearestPixel(metrics.width / 1.5),
  },
  showContainer: {
    borderRadius: metrics.radius,
    marginVertical: 15,
    marginHorizontal: PixelRatio.roundToNearestPixel(metrics.width / 6),
    width: PixelRatio.roundToNearestPixel(metrics.width / 1.5),
  },
  text: {
    padding: 10,
  },
  titleContainer: {
    minHeight: PixelRatio.roundToNearestPixel(100),
    width: PixelRatio.roundToNearestPixel(metrics.width / 1.5),
  },
});

ShowCard.propTypes = {
  colors: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  navigation: PropTypes.object,
  poster: PropTypes.string,
  setShowId: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setShowId: id => dispatch(setShowIdAction(id)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ShowCard);
