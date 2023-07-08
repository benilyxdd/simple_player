import { createSlice } from '@reduxjs/toolkit';

import {
  downloadMusic,
  setDownloadedMusic,
  setUpMusicFolder,
  setupTrackPlayer,
} from '@src/redux/slices/track-player/actions';

interface TrackPlayerState {
  isTrackPlaySetUp: boolean;
  isMusicFolderSetUp: boolean;
  downloadedMusic: { [key: string]: boolean };
}

const initialState: TrackPlayerState = {
  isTrackPlaySetUp: false,
  isMusicFolderSetUp: false,
  downloadedMusic: {},
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

    builder.addCase(downloadMusic.fulfilled, (state, action) => {
      state.downloadedMusic = {
        ...state.downloadedMusic,
        [action.payload]: true,
      };
    });

    builder.addCase(setDownloadedMusic.fulfilled, (state, action) => {
      state.downloadedMusic = action.payload;
    });
  },
});

export default trackPlayerSlice.reducer;
