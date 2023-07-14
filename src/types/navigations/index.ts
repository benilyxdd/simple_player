import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

// Types
import { LibraryNavigatorProps } from '@src/types/navigations/library';
import { SettingNavigatorProps } from '@src/types/navigations/setting';
import { PlaylistNavigatorProps } from '@src/types/navigations/playlist';

export type MainNavigatorProps = {
  library: NavigatorScreenParams<LibraryNavigatorProps>;
  setting: NavigatorScreenParams<SettingNavigatorProps>;
  playlist: NavigatorScreenParams<PlaylistNavigatorProps>;
  debug: undefined;
};

export type MainIndexNavigationProp = BottomTabNavigationProp<
  MainNavigatorProps,
  'library'
>;
