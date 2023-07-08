import { createAsyncThunk } from '@reduxjs/toolkit';
import { exists, mkdir } from 'react-native-fs';
import TrackPlayer from 'react-native-track-player';

import { MUSIC_FOLDER } from '@src/constants/path';
import { RootState } from '@src/redux/store';

export const setupTrackPlayer = createAsyncThunk(
  'track-player/setup',
  async (_arg, { getState }) => {
    const state = getState() as RootState;
    const isSetup = state.trackPlayer.isTrackPlaySetUp;

    try {
      if (!isSetup) {
        await TrackPlayer.setupPlayer();
      }
    } catch (err) {}
  },
);

export const setUpMusicFolder = createAsyncThunk(
  'track-player/setup-music-folder',
  async () => {
    const isCreated = await exists(MUSIC_FOLDER);

    try {
      if (!isCreated) {
        mkdir(MUSIC_FOLDER).then(() => console.log('Music folder created'));
      }
    } catch (err) {}
  },
);
