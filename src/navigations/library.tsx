import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// Screens
import Library from '@src/screens/library';

// Types
import { LibraryNavigatorProps } from '@src/types/navigations/library';

const NativeStack = createNativeStackNavigator<LibraryNavigatorProps>();

const LibraryNavigator = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'index'}>
      <NativeStack.Screen name={'index'} component={Library} />
    </NativeStack.Navigator>
  );
};

export default LibraryNavigator;
