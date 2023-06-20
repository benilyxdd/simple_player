import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

// Types
import { LibraryNavigatorProps } from '@src/types/navigations/library';

export type MainNavigatorProps = {
  library: NavigatorScreenParams<LibraryNavigatorProps>;
};

export type MainIndexNavigationProp = BottomTabNavigationProp<
  MainNavigatorProps,
  'library'
>;
