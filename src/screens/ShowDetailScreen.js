import React, {useEffect} from 'react';

// Core
import {ScrollView, StyleSheet, Text, View} from 'react-native';

// Personalized components
import {SectionContainer, SectionHeader, Summary, Show} from '../components';

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
  const {shows, show_id} = useSelector(state => state.shows);
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
      <Text style={textStyle.centeredSectionTitle}>Show Detail</Text>
      <ScrollView>
        <Show
          colors={colors}
          disabled={true}
          id={id}
          name={name}
          poster={image}
        />
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
  summaryContainer: {
    marginVertical: metrics.marginVertical,
  },
});

export default ShowDetailScreen;
