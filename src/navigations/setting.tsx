import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// Screens
import Setting from '@src/screens/setting';

// Types
import { SettingNavigatorProps } from '@src/types/navigations/setting';

const NativeStack = createNativeStackNavigator<SettingNavigatorProps>();

const SettingNavigator = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'index'}>
      <NativeStack.Screen name={'index'} component={Setting} />
    </NativeStack.Navigator>
  );
};

export default SettingNavigator;
