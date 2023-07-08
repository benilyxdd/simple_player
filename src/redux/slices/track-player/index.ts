import { createSlice } from '@reduxjs/toolkit';

import {
  setUpMusicFolder,
  setupTrackPlayer,
} from '@src/redux/slices/track-player/actions';

interface TrackPlayerState {
  isTrackPlaySetUp: boolean;
  isMusicFolderSetUp: boolean;
}

const initialState: TrackPlayerState = {
  isTrackPlaySetUp: false,
  isMusicFolderSetUp: false,
};

const trackPlayerSlice = createSlice({
  name: 'track-player',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // setupTrackPlayer
    builder.addCase(setupTrackPlayer.fulfilled, (state, _action) => {
      state.isTrackPlaySetUp = true;
    });

    builder.addCase(setUpMusicFolder.fulfilled, (state, _action) => {
      state.isMusicFolderSetUp = true;
    });
  },
});

export default trackPlayerSlice.reducer;
