import React from 'react';

// Core
import {ActivityIndicator, View} from 'react-native';

// Utils
import {genericStyles, metrics} from '../utils';

/**
 * @description basic footer loader for FlatList
 * @param {boolean} fetching
 */
function ListLoader({fetching}) {
  return (
    <View style={[{height: metrics.section}, genericStyles.centerContents]}>
      {fetching && <ActivityIndicator size="small" />}
    </View>
  );
}

export default ListLoader;
