// Core
import * as React from 'react';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

// Screens
import ShowsScreen from '../screens/ShowsScreen';
import ShowDetailScreen from '../screens/ShowDetailScreen';

const Stack = createSharedElementStackNavigator();

/**
 * @description Main App Navigator
 */
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Shows" headerMode="none">
        <Stack.Screen name="Shows" component={ShowsScreen} />
        <Stack.Screen
          name="ShowDetail"
          component={ShowDetailScreen}
          sharedElementsConfig={route => {
            const {show_id} = route.params;
            return [{id: `show.${show_id}`, resize: 'none'}];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
