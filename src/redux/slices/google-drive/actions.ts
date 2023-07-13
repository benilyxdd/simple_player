import { createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

import {
  fetchAllMusicByFolderId,
  fetchFolders,
} from '@src/services/google-drive-api';
import * as AsyncStorageUtils from '@src/utilities/async-storage';
import * as MusicUtils from '@src/utilities/music';

// types
import { SortBy } from '@src/components/sort-dialog';
import { RootState } from '@src/redux/store';
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

    // let files = (
    //   await Promise.all(
    //     selectedFoldersId.map(async id => {
    //       const songs = await fetchAllMusicByFolderId(id);
    //       return songs;
    //     }),
    //   )
    // ).reduce((prev, curr) => [...prev, ...curr], []);

    let files = [] as Array<Music>;
    for await (let id of selectedFoldersId) {
      const f = await fetchAllMusicByFolderId(id);
      files = [...files, ...f];
    }

    const sortBy = await AsyncStorageUtils.getItem<SortBy>('sortBy');
    if (!_.isNull(sortBy)) {
      files = MusicUtils.sortBy(sortBy, files);
    }

    return files as Array<Music>;
  },
);

export const sortMusicFile = createAsyncThunk(
  'google-drive/music-files-sort',
  async ({ sortBy }: { sortBy: SortBy }, { getState }) => {
    const { googleDrive } = getState() as RootState;
    return MusicUtils.sortBy(sortBy, googleDrive.musicFiles);
  },
);
