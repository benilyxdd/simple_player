import { createSlice } from '@reduxjs/toolkit';

// types
import { GetFolderRequestFile } from '@src/types/google-drive-apis/list';

// actions
import {
  googleDriveFetchFolders,
  updateSelectedFoldersId,
} from '@src/redux/slices/google-drive/actions';

interface GoogleDriveState {
  folders: Array<GetFolderRequestFile>;
  selectedFoldersId: Array<string>;
}

const initialState: GoogleDriveState = {
  folders: [],
  selectedFoldersId: [],
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
  },
});

export default googleDriveSlice.reducer;
