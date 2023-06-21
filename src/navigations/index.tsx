import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as StringUtils from '@src/utilities/string';

// Navigators
import LibraryNavigator from '@src/screens/library';

// Types
import { MainNavigatorProps } from '@src/types/navigations';

const BottomTab = createBottomTabNavigator<MainNavigatorProps>();

const CustomPaperBottomTabBar = ({
  descriptors,
  insets,
  navigation,
  state,
}: BottomTabBarProps) => {
  return (
    <BottomNavigation.Bar
      safeAreaInsets={insets}
      navigationState={state}
      onTabPress={({ route }) => {
        navigation.dispatch({
          ...CommonActions.navigate(route.name, route.params),
          target: state.key,
        });
      }}
      renderIcon={({ route, focused, color }) =>
        descriptors[route.key].options.tabBarIcon?.({
          focused,
          color,
          size: 24,
        }) || null
      }
      getLabelText={({ route }) =>
        StringUtils.capitalize(descriptors[route.key].route.name)
      }
    />
  );
};

const MainNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={CustomPaperBottomTabBar}
      initialRouteName={'library'}>
      <BottomTab.Screen
        name={'library'}
        component={LibraryNavigator}
        options={{
          tabBarLabel: 'Home',
          /* eslint-disable-next-line react/no-unstable-nested-components */
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainNavigator;