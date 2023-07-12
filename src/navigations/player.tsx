import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// Screens
import Player from '@src/screens/player';

// Types
import { PlayerNavigatorProps } from '@src/types/navigations/player';

const NativeStack = createNativeStackNavigator<PlayerNavigatorProps>();

const PlayerNavigator = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'index'}>
      <NativeStack.Screen name={'index'} component={Player} />
    </NativeStack.Navigator>
  );
};

export default PlayerNavigator;
