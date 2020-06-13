import React from 'react';

// Core
import {View} from 'react-native';

// Personalized components
import {TvMazeStatusbar} from './src/components';

// Navigation
import AppNavigator from './src/navigation';

// Utils
import {genericStyles} from './src/utils';

// Redux
import {Provider} from 'react-redux';
import createStore from './src/redux/index';

export const {store} = createStore();

function App() {
  return (
    <Provider store={store}>
      <View style={genericStyles.container}>
        <TvMazeStatusbar />
        <AppNavigator />
      </View>
    </Provider>
  );
}

export default App;
