import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAppDispatch, useAppSelector } from '@src/redux/hooks';
import {
  googleDriveFetchMusicFiles,
  updateSelectedFoldersId,
} from '@src/redux/slices/google-drive/actions';
import {
  setUpMusicFolder,
  setupTrackPlayer,
} from '@src/redux/slices/track-player/actions';
import * as AsyncStorageUtils from '@src/utilities/async-storage';
import * as StringUtils from '@src/utilities/string';

// Navigators
import LibraryNavigator from '@src/screens/library';
import SettingNavigator from '@src/screens/setting';

// Types
import { googleSignInSilently } from '@src/redux/slices/google-auth/actions';
import { MainNavigatorProps } from '@src/types/navigations';

// debug screen
import Debug from '@src/screens/debug';

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
  const dispatch = useAppDispatch();
  const { musicFiles } = useAppSelector(state => state.googleDrive);

  useEffect(() => {
    dispatch(setupTrackPlayer());
    dispatch(setUpMusicFolder());
    // auto sign in if signed in previously
    dispatch(googleSignInSilently());

    // set selected folders (google drive)
    (async () => {
      const selectedFolders = await AsyncStorageUtils.getItem<Array<string>>(
        'selectedFolders',
      );

      if (!_.isNull(selectedFolders)) {
        dispatch(updateSelectedFoldersId({ ids: selectedFolders }));
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await dispatch(googleDriveFetchMusicFiles());
    })();
  }, [musicFiles, dispatch]);

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
          tabBarLabel: 'Library',
          /* eslint-disable-next-line react/no-unstable-nested-components */
          tabBarIcon: ({ color, size }) => {
            return <Icon name="music-box-multiple" size={size} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name={'setting'}
        component={SettingNavigator}
        options={{
          tabBarLabel: 'Setting',
          /* eslint-disable-next-line react/no-unstable-nested-components */
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cog" size={size} color={color} />;
          },
        }}
      />
      {__DEV__ && (
        <BottomTab.Screen
          name={'debug'}
          component={Debug}
          options={{
            tabBarLabel: 'Debug',
            /* eslint-disable-next-line react/no-unstable-nested-components */
            tabBarIcon: ({ color, size }) => {
              return <Icon name="magnify" size={size} color={color} />;
            },
          }}
        />
      )}
    </BottomTab.Navigator>
  );
};

export default MainNavigator;
