import 'react-native-gesture-handler';
import './src/utils/wydr';

import React, {useEffect} from 'react';

// Core
import {View, Platform} from 'react-native';

// Personalized components
import {TvMazeStatusbar} from './src/components';

// External Libs
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';

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

  /**
   * @description on load remove splash
   */
  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
