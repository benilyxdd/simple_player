import { createAsyncThunk } from '@reduxjs/toolkit';
import TrackPlayer from 'react-native-track-player';

import { RootState } from '@src/redux/store';

export const setupTrackPlayer = createAsyncThunk(
  'track-player/setup',
  async (_arg, { getState }) => {
    const state = getState() as RootState;
    const isSetup = state.trackPlayer.isSetUp;

    try {
      if (!isSetup) {
        await TrackPlayer.setupPlayer();
      }
    } catch (err) {}
  },
);
