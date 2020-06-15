import React from 'react';

// Core
import {ScrollView, StyleSheet, Text, View} from 'react-native';

// Personalized components
import {Header, SectionContainer, SectionHeader, Summary} from '../components';

// External libs
import FastImage from 'react-native-fast-image';

// Utils
import {
  fonts,
  getThemeColors,
  genericStyles,
  parseStringToObject,
  metrics,
} from '../utils';

// Redux
import {useSelector} from 'react-redux';

/**
 * @description The purpose of the screen is to show selected show details
 */
function EpisodeDetailScreen({navigation}) {
  const {episodes, episode_id} = useSelector(state => state.shows);
  const {themeColorType} = useSelector(state => state.themes);
  const colors = getThemeColors(themeColorType);
  const {textStyle} = fonts;
  const selected_episode = episodes.find(show => show.id === episode_id);
  const {season, name, number, image, summary} = selected_episode || {};
  const parsedSummary = parseStringToObject(summary || '');

  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundAlt}]}>
      <Header title="Episode Detail" canBack />
      <SectionHeader title={name} centered />
      <ScrollView>
        <View style={[styles.centerContents, styles.marginContent]}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={{uri: image?.medium}}
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
    aspectRatio: 1.7,
    borderRadius: metrics.radius,
    height: undefined,
    width: metrics.width / 1.5,
  },
  summaryContainer: {
    marginHorizontal: metrics.marginHorizontal,
    marginVertical: metrics.marginVertical,
  },
});

export default EpisodeDetailScreen;
