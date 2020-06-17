import React from 'react';

// Core
import {PixelRatio, ScrollView, StyleSheet, View} from 'react-native';

// Assets
import images from '../assets/images';

// Personalized components
import {Header, SectionContainer, SectionHeader, Summary} from '../components';

// External libs
import FastImage from 'react-native-fast-image';

// Utils
import {
  getThemeColors,
  genericStyles,
  parseStringToObject,
  metrics,
} from '../utils';

// Redux
import {useSelector} from 'react-redux';

/**
 * @description The purpose of the screen is to show selected episode details
 */
function EpisodeDetailScreen() {
  const {episodes, episode_id} = useSelector(state => state.shows);
  const {themeColorType} = useSelector(state => state.themes);
  const colors = getThemeColors(themeColorType);
  const selected_episode = episodes.find(show => show.id === episode_id);
  const {season, name, number, image, summary} = selected_episode || {};
  const parsedSummary = parseStringToObject(
    summary || '<p>No information yet</p>',
  );
  const episodeImage = image?.medium
    ? {uri: image.medium}
    : images.episode_image;

  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundAlt}]}>
      <Header title="Episode Detail" canBack />
      <SectionHeader title={name} centered />
      <ScrollView>
        <View style={[styles.centerContents, styles.marginContent]}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={episodeImage}
            style={styles.imageStyle}
          />
        </View>
        <SectionContainer title="Number" payload={`${number}`} />
        <SectionContainer title="Season" payload={`${season}`} />
        <SectionHeader title="Summary" />
        <View style={styles.summaryContainer}>
          <Summary objectElements={parsedSummary} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
  marginContent: {
    marginVertical: metrics.marginVertical,
  },
  imageStyle: {
    borderRadius: metrics.radius,
    height: PixelRatio.roundToNearestPixel(metrics.width / 1.5 / 1.7),
    width: PixelRatio.roundToNearestPixel(metrics.width / 1.5),
  },
  summaryContainer: {
    marginHorizontal: metrics.marginHorizontal,
    marginVertical: metrics.marginVertical,
  },
});

export default EpisodeDetailScreen;
