import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchFolders } from '@src/services/google-drive-api';

export const googleDriveFetchFolders = createAsyncThunk(
  'google-drive/fetch-folders',
  async () => {
    const folders = await fetchFolders();
    return { folders };
  },
);
