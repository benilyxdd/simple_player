import { createSlice } from '@reduxjs/toolkit';

import {
  downloadMassMusic,
  downloadMusic,
  setDownloadedMusic,
  setUpMusicFolder,
  setupTrackPlayer,
} from '@src/redux/slices/track-player/actions';

interface TrackPlayerState {
  isTrackPlaySetUp: boolean;
  isMusicFolderSetUp: boolean;
  downloadedMusic: { [key: string]: boolean };
  downloadingMusic: { [key: string]: boolean };
}

const initialState: TrackPlayerState = {
  isTrackPlaySetUp: false,
  isMusicFolderSetUp: false,
  downloadedMusic: {},
  downloadingMusic: {},
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

      const { [action.payload]: _, ...unfinishedDownload } =
        state.downloadingMusic;
      state.downloadingMusic = unfinishedDownload;
    });
    builder.addCase(downloadMusic.pending, (state, action) => {
      state.downloadingMusic = {
        ...state.downloadingMusic,
        [action.meta.arg.id]: true,
      };
    });

    builder.addCase(downloadMassMusic.fulfilled, (state, action) => {
      state.downloadedMusic = {
        ...state.downloadedMusic,
        ...action.payload,
      };

      state.downloadingMusic = {};
    });
    builder.addCase(downloadMassMusic.pending, (state, action) => {
      state.downloadingMusic = {
        ...state.downloadingMusic,
        ...action.meta.arg.ids.reduce(
          (prev, curr) => ({ ...prev, [curr]: true }),
          {},
        ),
      };
    });

    builder.addCase(setDownloadedMusic.fulfilled, (state, action) => {
      state.downloadedMusic = action.payload;
    });
  },
});

export default trackPlayerSlice.reducer;
