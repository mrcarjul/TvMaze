import React, {useEffect, useMemo} from 'react';

// Core
import {ScrollView, StyleSheet, View} from 'react-native';

// Assets
import images from '../assets/images';

// Personalized components
import {
  Header,
  ListLoader,
  SectionContainer,
  SectionHeader,
  Summary,
} from '../components';

// External libs
import FastImage from 'react-native-fast-image';
import {SharedElement} from 'react-navigation-shared-element';

// Utils
import PropTypes from 'prop-types';
import {
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
  const {fetching, episodes, shows, show_id} = useSelector(
    state => state.shows,
  );
  const {themeColorType} = useSelector(state => state.themes);
  const dispatch = useDispatch();
  const colors = getThemeColors(themeColorType);
  const selected_show = shows.find(show => show.id === show_id);
  const {genres, name, image, network, schedule, summary, webChannel} =
    selected_show || {};
  const {medium} = image || {};
  const uri = useMemo(() => ({uri: medium || images.show_image}), [medium]);
  const {time, days} = schedule || {}; // Could be empty
  const parsedSummary = parseStringToObject(
    summary || '<p>No information yet</p>',
  );

  /**
   * @description request episodes info
   */
  useEffect(() => {
    dispatch(getShowEpisodesByIdAction(show_id));
  }, [dispatch, show_id]);

  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundAlt}]}>
      <Header title="Serie Detail" canBack />
      <SectionHeader title={name} centered />
      <ScrollView>
        <View
          collapsable={false}
          style={[styles.centerContents, styles.marginContent]}>
          <SharedElement id={`show.${show_id}`}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={uri}
              style={styles.imageStyle}
            />
          </SharedElement>
        </View>
        <SectionContainer title="Genres" payload={genres} />
        <SectionContainer
          title={network?.name ? 'Network' : 'Web channel'}
          payload={network?.name || webChannel?.name}
        />
        {days?.length !== 0 && (
          <SectionContainer
            title="Schedule"
            payload={days}
            commas={true}
            time={time}
          />
        )}
        <SectionHeader title="Summary" />
        <View style={styles.summaryContainer}>
          <Summary objectElements={parsedSummary} />
        </View>
        {fetching ? (
          <ListLoader fetching={fetching} />
        ) : (
          <SectionContainer
            title="Episodes"
            payload={episodes}
            episodes
            navigation={navigation}
          />
        )}
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

ShowDetailScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ShowDetailScreen;
