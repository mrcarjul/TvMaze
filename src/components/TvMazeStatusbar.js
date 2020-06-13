import React, {useEffect, useState} from 'react';

// Core
import {
  NativeModules,
  Platform,
  StatusBarIOS,
  StatusBar,
  View,
} from 'react-native';

// External libs
import {getStatusBarHeight} from 'react-native-status-bar-height';

/**
 * @description Component in charge of status bar managment doing the right calculations
 */
function TvMazeStatusbar() {
  const [statusbarHeight, setStatusbarHeight] = useState(getStatusBarHeight());

  /**
   * @description effect needed for ios to detect changes in status bar due to shared hotspot or others
   */
  useEffect(() => {
    const {StatusBarManager} = NativeModules;
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(({height}) => setStatusbarHeight(height));

      const listener = StatusBarIOS.addListener(
        'statusBarFrameWillChange',
        statusBarData =>
          this.setState({statusBarHeight: statusBarData.frame.height}),
      );
      return () => listener.remove();
    }
  }, []);

  return (
    <View style={{height: statusbarHeight}}>
      <StatusBar barStyle="dark-content" />
    </View>
  );
}

export default TvMazeStatusbar;
