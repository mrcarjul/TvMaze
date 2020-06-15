import React, {useCallback} from 'react';

// Core
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// Personalized components
import SectionHeader from './SectionHeader';

// Utils
import PropTypes from 'prop-types';
import {genericStyles, fonts, metrics} from '../utils';

// Redux
import {useDispatch} from 'react-redux';
import {setEpisodeIdAction} from '../redux/actions/shows';

/**
 * @description displays a header with given title and information in container
 * @param {boolean} commas if true separates payload by commas
 * @param {object} colors
 * @param {boolean} episodes if true renders a table from payload
 * @param {object} navigation
 * @param {array} payload items to render in container
 * @param {string} time
 * @param {string} title SectionHeader titla
 */
function SectionContainer({
  commas,
  colors,
  episodes,
  navigation,
  time,
  title,
  payload,
}) {
  const dispatch = useDispatch();
  const {textStyle} = fonts;

  /**
   * @description Sets episode id and navigates to episode detail screen
   */
  const onSelectEpisode = useCallback(
    episode_id => {
      dispatch(setEpisodeIdAction(episode_id));
      navigation.navigate('Episode');
    },
    [dispatch, navigation],
  );

  /**
   * @description switch to evaluate payload
   * @returns {React.Component}
   */
  const getElement = () => {
    let currSeasonIdx = null;
    switch (typeof payload) {
      case 'string':
        return (
          <View style={styles.sectionItem}>
            <Text style={textStyle.normal}>{payload}</Text>
          </View>
        );
      case 'object':
        if (commas) {
          return (
            <View style={styles.sectionItem}>
              <Text style={textStyle.normal}>
                {payload.join(', ')} at {time}
              </Text>
            </View>
          );
        }
        if (episodes) {
          return payload.map(({name, id, season}, idx) => {
            const backgroundColor =
              idx % 2 === 0
                ? colors.backgroundAlt
                : colors.backgroundSecondaryAlt;
            const color = idx % 2 === 0 ? colors.text : colors.primary;
            let renderSeason = false;
            if (currSeasonIdx === null) {
              currSeasonIdx = season;
              renderSeason = true;
            } else if (season !== currSeasonIdx) {
              currSeasonIdx = season;
              renderSeason = true;
            }
            return (
              <React.Fragment key={`${title}-${id}`}>
                {renderSeason && (
                  <View
                    style={[
                      styles.sectionItem,
                      {backgroundColor: colors.background},
                    ]}>
                    <Text
                      style={[
                        textStyle.centeredNormal,
                        {color: colors.textAlt},
                      ]}>
                      {`Season ${season.toString()}`}
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  style={[styles.episodesItem, {backgroundColor}]}
                  onPress={() => onSelectEpisode(id)}>
                  <Text style={[textStyle.normal, {color}]}>{name}</Text>
                </TouchableOpacity>
              </React.Fragment>
            );
          });
        }
        return payload.map(item => (
          <View key={`${title}-${item}`} style={styles.sectionItem}>
            <Text style={textStyle.normal}>{item}</Text>
          </View>
        ));
      default:
        return null;
    }
  };

  return (
    <>
      <SectionHeader title={title} />
      <View style={episodes ? styles.marginBottom : styles.showDetailContainer}>
        {getElement()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
  episodesItem: {
    justifyContent: 'center',
    minHeight: 40,
    paddingVertical: metrics.padding,
    paddingLeft: metrics.padding,
  },
  marginBottom: {
    marginBottom: metrics.marginVertical,
  },
  sectionItem: {
    minHeight: 30,
    paddingVertical: metrics.padding,
    paddingLeft: metrics.padding,
  },
  showDetailContainer: {
    marginVertical: metrics.marginVertical,
  },
});

SectionContainer.propTypes = {
  colors: PropTypes.object,
  commas: PropTypes.bool,
  episodes: PropTypes.bool,
  navigation: PropTypes.object,
  payload: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  time: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default SectionContainer;
