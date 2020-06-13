import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

/**
 * @description The purpose of the screen is to be the main screen to display shows list
 */
function ShowsScreen() {
  return (
    <View style={styles.mainContainer}>
      <Text>Shows Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default ShowsScreen;
