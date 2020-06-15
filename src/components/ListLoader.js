import React from 'react';

// Core
import {ActivityIndicator, View} from 'react-native';

// Utils
import PropTypes from 'prop-types';
import {genericStyles, metrics} from '../utils';

/**
 * @description basic footer loader for FlatList
 * @param {boolean} fetching if true shows loader
 */
function ListLoader({fetching}) {
  return (
    <View style={[{height: metrics.section}, genericStyles.centerContents]}>
      {fetching && <ActivityIndicator size="small" />}
    </View>
  );
}

ListLoader.propTypes = {
  fetching: PropTypes.bool,
};

export default ListLoader;
