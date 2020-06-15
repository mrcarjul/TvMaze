import React from 'react';

// Core
import {StyleSheet, Text, View} from 'react-native';

// Personalized components
import SectionHeader from './SectionHeader';

// Utils
import PropTypes from 'prop-types';
import {genericStyles, fonts, metrics} from '../utils';

/**
 * @description displays a header with given title and information in container
 * @param {string} title
 * @param {array} payload
 * @param {boolean} commas
 * @param {string} time
 */
function SectionContainer({title, payload, commas, time}) {
  const {textStyle} = fonts;
  return (
    <>
      <SectionHeader title={title} />
      <View style={styles.showDetailContainer}>
        {commas ? (
          <View style={styles.sectionItem}>
            <Text style={textStyle.normal}>
              {payload.join(', ')} at {time}
            </Text>
          </View>
        ) : payload?.length > 0 ? (
          payload.map(item => (
            <View key={`${title}-${item}`} style={styles.sectionItem}>
              <Text style={textStyle.normal}>{item}</Text>
            </View>
          ))
        ) : (
          <Text style={textStyle.normal}>Unknown</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
  sectionItem: {
    height: 30,
    paddingLeft: metrics.paddingLeft,
  },
  showDetailContainer: {
    marginVertical: metrics.marginVertical,
  },
});

SectionContainer.propTypes = {
  commas: PropTypes.bool,
  payload: PropTypes.array.isRequired,
  time: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default SectionContainer;
