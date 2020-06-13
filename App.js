import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';

import AppNavigator from './src/navigation';

function App() {
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default App;
