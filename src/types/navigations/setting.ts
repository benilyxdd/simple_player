import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { MainNavigatorProps } from '@src/types/navigations';

// Navigator
export type SettingNavigatorProps = {
  index: undefined;
};

// Screens
export type SettingIndexScreenProps = CompositeNavigationProp<
  NativeStackNavigationProp<SettingNavigatorProps, 'index'>,
  BottomTabNavigationProp<MainNavigatorProps>
>;
