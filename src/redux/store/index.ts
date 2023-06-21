import { configureStore } from '@reduxjs/toolkit';

import googleAuth from '@src/redux/slices/google-auth';

const store = configureStore({
  reducer: {
    googleAuth: googleAuth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
