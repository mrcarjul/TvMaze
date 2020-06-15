import 'react-native-gesture-handler';
import './src/utils/wydr';

import React from 'react';

// Core
import {View, Platform} from 'react-native';

// Personalized components
import {TvMazeStatusbar} from './src/components';

// External Libs
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Navigation
import AppNavigator from './src/navigation';

// Utils
import {genericStyles} from './src/utils';

// Redux
import {Provider} from 'react-redux';
import createStore from './src/redux/index';

export const {store} = createStore();

function App() {
  // Preload icons
  if (Platform.OS === 'ios') {
    AntDesign.loadFont();
    MaterialIcons.loadFont();
  }

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
