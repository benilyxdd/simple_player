import { createSlice } from '@reduxjs/toolkit';

// types
import { ListResponse } from '@src/types/google-apis/drive/files';
import { Music } from '@src/types/music';

// actions
import {
  googleDriveFetchFolders,
  googleDriveFetchMusicFiles,
  updateSelectedFoldersId,
} from '@src/redux/slices/google-drive/actions';

interface GoogleDriveState {
  folders: ListResponse['files'];
  selectedFoldersId: Array<string>; // Folder object but with id, so string
  musicFiles: Array<Music>;
}

const initialState: GoogleDriveState = {
  folders: [],
  selectedFoldersId: [],
  musicFiles: [],
};

export const googleDriveSlice = createSlice({
  name: 'google-auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(googleDriveFetchFolders.fulfilled, (state, action) => {
      state.folders = action.payload.folders;
    });

    builder.addCase(updateSelectedFoldersId.fulfilled, (state, action) => {
      state.selectedFoldersId = action.payload;
    });

    builder.addCase(googleDriveFetchMusicFiles.fulfilled, (state, action) => {
      state.musicFiles = action.payload;
    });
  },
});

export default googleDriveSlice.reducer;
