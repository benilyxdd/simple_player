import { configureStore } from '@reduxjs/toolkit';

// slices
import googleAuth from '@src/redux/slices/google-auth';
import googleDrive from '@src/redux/slices/google-drive';
import trackPlayer from '@src/redux/slices/track-player';

const store = configureStore({
  reducer: {
    googleAuth: googleAuth,
    trackPlayer: trackPlayer,
    googleDrive: googleDrive,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
