import {
  GoogleSignin,
  isNativeModuleError,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { setAccessToken } from '@src/services/google-drive-api';

GoogleSignin.configure({ scopes: ['https://www.googleapis.com/auth/drive'] });

export const googleSignIn = createAsyncThunk('google-auth/signin', async () => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    // might need to add that because 'scopes' from configure does not work somehow
    await GoogleSignin.addScopes({
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const user = await GoogleSignin.getCurrentUser();
    const tokens = await GoogleSignin.getTokens();

    setAccessToken(tokens.accessToken);
    return { user, tokens };
  } catch (err) {
    if (isNativeModuleError(err)) {
      switch (err.code) {
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          break;
        case statusCodes.SIGN_IN_CANCELLED:
          break;
        case statusCodes.IN_PROGRESS:
          break;
        default:
          break;
      }
      return Promise.reject(null);
    } else {
      return Promise.reject(null);
    }
  }
});

export const googleSignInSilently = createAsyncThunk(
  'google-auth/signin-silently',
  async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signInSilently();
      const user = await GoogleSignin.getCurrentUser();
      const tokens = await GoogleSignin.getTokens();

      setAccessToken(tokens.accessToken);
      return { user, tokens };
    } catch (err) {
      console.error(err);
      return Promise.reject(null);
    }
  },
);

export const googleSignOut = createAsyncThunk(
  'google-auth/signout',
  async () => {
    await GoogleSignin.signOut();
    setAccessToken('');
  },
);
