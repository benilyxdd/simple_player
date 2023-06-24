import { createSlice } from '@reduxjs/toolkit';

// types
import { GetFolderRequestFile } from '@src/types/google-drive-apis/list';

// actions
import { googleDriveFetchFolders } from '@src/redux/slices/google-drive/actions';

interface GoogleDriveState {
  folders: Array<GetFolderRequestFile>;
}

const initialState: GoogleDriveState = {
  folders: [],
};

const googleDriveSlice = createSlice({
  name: 'google-auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // googleDriveFetchFolders
    builder.addCase(googleDriveFetchFolders.fulfilled, (state, action) => {
      state.folders = action.payload.folders;
    });
  },
});

export default googleDriveSlice.reducer;
