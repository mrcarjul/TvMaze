import React from 'react';

// Core
import {View} from 'react-native';

// Personalized components
import {TvMazeStatusbar} from './src/components';

// Navigation
import AppNavigator from './src/navigation';

// Utils
import {genericStyles} from './src/utils';

function App() {
  return (
    <View style={genericStyles.container}>
      <TvMazeStatusbar />
      <AppNavigator />
    </View>
  );
}

export default App;
