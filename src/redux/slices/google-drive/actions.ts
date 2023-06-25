import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchFolders } from '@src/services/google-drive-api';
import * as AsyncStorageUtils from '@src/utilities/async-storage';

export const googleDriveFetchFolders = createAsyncThunk(
  'google-drive/fetch-folders',
  async () => {
    const folders = await fetchFolders();
    return { folders };
  },
);

export const updateSelectedFoldersId = createAsyncThunk(
  'google-drive/update-selected-folder-ids',
  async ({ ids }: { ids: Array<string> }) => {
    await AsyncStorageUtils.setItem('selectedFolders', ids);

    return ids;
  },
);
