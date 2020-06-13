// Core
import * as React from 'react';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import ShowsScreen from '../screens/ShowsScreen';

const Stack = createStackNavigator();

/**
 * @description Main App Navigator
 */
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Shows" headerMode="none">
        <Stack.Screen name="Shows" component={ShowsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
