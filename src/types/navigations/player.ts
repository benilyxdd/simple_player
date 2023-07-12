import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { MainNavigatorProps } from '@src/types/navigations';

// Navigator
export type PlayerNavigatorProps = {
  index: undefined;
};

// Screens
export type PlayerIndexScreenProps = CompositeNavigationProp<
  NativeStackNavigationProp<PlayerNavigatorProps, 'index'>,
  BottomTabNavigationProp<MainNavigatorProps>
>;
