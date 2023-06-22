import { configureStore } from '@reduxjs/toolkit';

import googleAuth from '@src/redux/slices/google-auth';
import trackPlayer from '@src/redux/slices/track-player';

const store = configureStore({
  reducer: {
    googleAuth: googleAuth,
    trackPlayer: trackPlayer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
