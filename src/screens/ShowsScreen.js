import React from 'react';

// Core
import {StyleSheet, Text, View} from 'react-native';

// Utils
import {genericStyles} from '../utils';

/**
 * @description The purpose of the screen is to be the main screen to display shows list
 */
function ShowsScreen() {
  return (
    <View style={styles.container}>
      <Text>Shows Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
  mainContainer: {
    flex: 1,
  },
});

export default ShowsScreen;
