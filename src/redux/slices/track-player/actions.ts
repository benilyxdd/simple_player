import { createAsyncThunk } from '@reduxjs/toolkit';
import { exists, mkdir } from 'react-native-fs';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
} from 'react-native-track-player';

import { MUSIC_FOLDER } from '@src/constants/path';
import { RootState } from '@src/redux/store';
import { downloadMusicByFileId } from '@src/services/google-drive-api';
import * as AsyncStorageUtils from '@src/utilities/async-storage';

export const setupTrackPlayer = createAsyncThunk(
  'track-player/setup',
  async (_arg, { getState }) => {
    const state = getState() as RootState;
    const isSetup = state.trackPlayer.isTrackPlaySetUp;

    try {
      if (!isSetup) {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          android: {
            appKilledPlaybackBehavior:
              AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
          },
          progressUpdateEventInterval: 2,
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.SeekTo,
          ],
          compactCapabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
          ],
        });
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
      }
    } catch (err) {}
  },
);

export const setUpMusicFolder = createAsyncThunk(
  'track-player/setup-music-folder',
  async () => {
    const isCreated = await exists(MUSIC_FOLDER);

    try {
      if (!isCreated) {
        mkdir(MUSIC_FOLDER).then(() => console.log('Music folder created'));
      }
    } catch (err) {}
  },
);

export const downloadMusic = createAsyncThunk(
  'track-player/download-music',
  async ({ id }: { id: string }, { getState }) => {
    await downloadMusicByFileId(id);

    const { trackPlayer } = getState() as RootState;
    const newDownloadedMusic = { ...trackPlayer.downloadedMusic, [id]: true };
    AsyncStorageUtils.setItem('downloadedMusic', newDownloadedMusic);

    return id;
  },
);

export const setDownloadedMusic = createAsyncThunk(
  'track-player/set-downloaded-music',
  async ({ ids }: { ids: { [key: string]: boolean } }) => {
    return ids;
  },
);
