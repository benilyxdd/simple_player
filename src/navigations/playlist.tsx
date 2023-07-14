import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// Screens
import Playlist from '@src/screens/playlist';

// Types
import { PlaylistNavigatorProps } from '@src/types/navigations/playlist';

const NativeStack = createNativeStackNavigator<PlaylistNavigatorProps>();

const PlayerNavigator = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'index'}>
      <NativeStack.Screen name={'index'} component={Playlist} />
    </NativeStack.Navigator>
  );
};

export default PlayerNavigator;
