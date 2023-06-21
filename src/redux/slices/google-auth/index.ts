import { User } from '@react-native-google-signin/google-signin';
import { createSlice } from '@reduxjs/toolkit';

import {
  googleSignIn,
  googleSignOut,
} from '@src/redux/slices/google-auth/actions';

interface GoogleAuthState {
  isSignIn: boolean;
  user: User | null | undefined;
  accessToken: string | null | undefined;
  idToken: string | null | undefined;
}

const initialState: GoogleAuthState = {
  isSignIn: false,
  user: null,
  accessToken: null,
  idToken: null,
};

const googleAuthSlice = createSlice({
  name: 'google-auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // googleSignIn
    builder.addCase(googleSignIn.fulfilled, (state, action) => {
      state.isSignIn = true;
      state.user = action.payload?.user;
      state.accessToken = action.payload?.tokens.accessToken;
      state.idToken = action.payload?.tokens.idToken;
    });
    // builder.addCase(googleSignIn.pending, state => {});
    // builder.addCase(googleSignIn.rejected, (state, action) => {});

    builder.addCase(googleSignOut.fulfilled, (state, _action) => {
      state.isSignIn = false;
      state.user = null;
      state.accessToken = null;
      state.idToken = null;
    });
  },
});

export default googleAuthSlice.reducer;
