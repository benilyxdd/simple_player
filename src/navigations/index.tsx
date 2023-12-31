import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { BottomNavigation } from 'react-native-paper';
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { TRACK_PLAYER_URI } from '@src/constants/path';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks';
import { googleSignInSilently } from '@src/redux/slices/google-auth/actions';
import {
  googleDriveFetchMusicFiles,
  updateSelectedFoldersId,
} from '@src/redux/slices/google-drive/actions';
import {
  setDownloadedMusic,
  setUpMusicFolder,
  setupTrackPlayer,
} from '@src/redux/slices/track-player/actions';

// Utils
import * as AsyncStorageUtils from '@src/utilities/async-storage';
import * as StringUtils from '@src/utilities/string';

// Navigators
import LibraryNavigator from '@src/navigations/library';
import PlaylistNavigator from '@src/navigations/playlist';
import SettingNavigator from '@src/navigations/setting';

// Types
import { Music } from '@src/types/music';
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
  const { selectedFoldersId } = useAppSelector(state => state.googleDrive);

  useEffect(() => {
    dispatch(setupTrackPlayer());
    dispatch(setUpMusicFolder());
    // auto sign in if signed in previously
    dispatch(googleSignInSilently())
      .then(() => {
        return AsyncStorageUtils.getItem<{
          [key: string]: boolean;
        }>('downloadedMusic');
      })
      .then(async downloadedMusic => {
        const selectedFolders = await AsyncStorageUtils.getItem<Array<string>>(
          'selectedFolders',
        );

        let musicFiles = [] as Array<Music>;
        if (!_.isNull(selectedFolders)) {
          await dispatch(updateSelectedFoldersId({ ids: selectedFolders }));
          const { payload } = await dispatch(googleDriveFetchMusicFiles());
          musicFiles = payload as Array<Music>;
        }
        // })();

        // set downloaded music (track player)

        if (!_.isNull(downloadedMusic)) {
          dispatch(setDownloadedMusic({ ids: downloadedMusic }));

          await TrackPlayer.reset();
          const queue = musicFiles
            .filter(music => downloadedMusic[music.id])
            .map(music => ({ ...music, url: TRACK_PLAYER_URI(music.id) }));
          TrackPlayer.add(queue);
        }
      });
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(googleDriveFetchMusicFiles());
    })();
  }, [selectedFoldersId, dispatch]);

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
        name={'playlist'}
        component={PlaylistNavigator}
        options={{
          tabBarLabel: 'Playlist',
          /* eslint-disable-next-line react/no-unstable-nested-components */
          tabBarIcon: ({ color, size }) => {
            return <Icon name="play-box" size={size} color={color} />;
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
