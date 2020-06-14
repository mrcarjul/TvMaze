import React from 'react';

// Core
import {Image, StyleSheet, Text, View} from 'react-native';

// Utils
import {genericStyles} from '../utils';

function Show({name, poster}) {
  return (
    <View style={[styles.showContainer, styles.centerContents]}>
      <Image source={{uri: poster?.medium}} style={styles.imageStyle} />
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
  imageStyle: {
    height: 295,
    width: 210,
  },
  showContainer: {
    paddingVertical: 15,
  },
});

export default Show;
