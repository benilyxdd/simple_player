import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '@src/redux/store';
import {
  fetchMusicInsideFolder,
  fetchFolders,
} from '@src/services/google-drive-api';
import * as AsyncStorageUtils from '@src/utilities/async-storage';

import { Music } from '@src/types/music';

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

export const googleDriveFetchMusicFiles = createAsyncThunk(
  'google-drive/fetch-music-files',
  async (_arg, { getState }) => {
    const { googleDrive } = getState() as RootState;
    const selectedFoldersId = googleDrive.selectedFoldersId;

    let files = [] as Array<Music>;
    for await (let id of selectedFoldersId) {
      const f = await fetchMusicInsideFolder(id);
      files = [...files, ...f];
    }
    return files;
  },
);
