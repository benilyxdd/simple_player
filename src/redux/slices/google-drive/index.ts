import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// types
import { GetFolderRequestFile } from '@src/types/google-drive-apis/list';

// actions
import { googleDriveFetchFolders } from '@src/redux/slices/google-drive/actions';

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
  reducers: {
    updatedSelectedFoldersId: {
      reducer: (state, action: PayloadAction<Array<string>>) => {
        state.selectedFoldersId = action.payload;
      },
      prepare: (ids: Array<string>) => {
        return { payload: ids };
      },
    },
  },
  extraReducers: builder => {
    // googleDriveFetchFolders
    builder.addCase(googleDriveFetchFolders.fulfilled, (state, action) => {
      state.folders = action.payload.folders;
    });
  },
});

export default googleDriveSlice.reducer;
