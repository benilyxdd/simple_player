import { createSlice } from '@reduxjs/toolkit';

import { setupTrackPlayer } from '@src/redux/slices/track-player/actions';

interface TrackPlayerState {
  isSetUp: boolean;
}

const initialState: TrackPlayerState = {
  isSetUp: false,
};

const trackPlayerSlice = createSlice({
  name: 'track-player',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // setupTrackPlayer
    builder.addCase(setupTrackPlayer.fulfilled, (state, _action) => {
      state.isSetUp = true;
    });
  },
});

export default trackPlayerSlice.reducer;
