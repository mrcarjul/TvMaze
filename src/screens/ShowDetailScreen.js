import React, {useEffect} from 'react';

// Core
import {ScrollView, StyleSheet, Text, View} from 'react-native';

// Personalized components
import {SectionContainer, SectionHeader, Summary} from '../components';

// External libs
import FastImage from 'react-native-fast-image';
import {SharedElement} from 'react-navigation-shared-element';

// Utils
import {
  fonts,
  getThemeColors,
  genericStyles,
  parseStringToObject,
  metrics,
} from '../utils';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {getShowEpisodesByIdAction} from '../redux/actions/shows';

/**
 * @description The purpose of the screen is to show selected show details
 */
function ShowDetailScreen({navigation}) {
  const {episodes, shows, show_id} = useSelector(state => state.shows);
  const {themeColorType} = useSelector(state => state.themes);
  const dispatch = useDispatch();
  const colors = getThemeColors(themeColorType);
  const {textStyle} = fonts;
  const selected_show = shows.find(show => show.id === show_id);
  const {genres, name, id, image, schedule, summary} = selected_show || {};
  const {time, days} = schedule || {}; // Could be empty
  const parsedSummary = parseStringToObject(summary || '');

  useEffect(() => {
    dispatch(getShowEpisodesByIdAction(show_id));
  }, [dispatch, show_id]);

  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundAlt}]}>
      <Text style={[styles.marginContent, textStyle.centeredSectionTitle]}>
        Serie Detail
      </Text>
      <SectionHeader title={name} centered />
      <ScrollView>
        <View style={[styles.centerContents, styles.marginContent]}>
          <SharedElement id={`show.${show_id}`}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={{uri: image?.medium}}
              style={styles.imageStyle}
            />
          </SharedElement>
        </View>
        <SectionContainer title="Genres" payload={genres} />
        <SectionContainer
          title="Schedule"
          payload={days}
          commas={true}
          time={time}
        />
        <SectionHeader title="Summary" />
        <View style={styles.summaryContainer}>
          <Summary objectElements={parsedSummary} />
        </View>
        <SectionContainer title="" payload={null} />
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
    height: metrics.width / 2 / metrics.imageRatio,
    width: metrics.width / 2,
  },
  summaryContainer: {
    marginHorizontal: metrics.marginHorizontal,
    marginVertical: metrics.marginVertical,
  },
});

ShowDetailScreen.sharedElements = (route, otherRoute, showing) => [
  {id: `show.${route.params.show_id}`, resize: 'none'},
];

export default ShowDetailScreen;
