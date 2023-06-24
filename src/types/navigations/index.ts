import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

// Types
import { LibraryNavigatorProps } from '@src/types/navigations/library';
import { SettingNavigatorProps } from '@src/types/navigations/setting';

export type MainNavigatorProps = {
  library: NavigatorScreenParams<LibraryNavigatorProps>;
  setting: NavigatorScreenParams<SettingNavigatorProps>;
};

export type MainIndexNavigationProp = BottomTabNavigationProp<
  MainNavigatorProps,
  'library'
>;
