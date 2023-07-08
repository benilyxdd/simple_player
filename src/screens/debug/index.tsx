import React, { useState } from 'react';
import { Button, View } from 'react-native';

import { MUSIC_FOLDER } from '@src/constants/path';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks';
import { googleSignOut } from '@src/redux/slices/google-auth/actions';
import {
  downloadMusicByFileId,
  getAccessToken,
  listAllFilesFromApp,
} from '@src/services/google-drive-api';
import { getFSInfo } from 'react-native-fs';
import TrackPlayer, { State } from 'react-native-track-player';
import _ from 'lodash';

const track = [
  {
    url: 'file://' + MUSIC_FOLDER + '1UkYxMFIVN8qF6sO9eEBGtCBGCgWzpRpy.mp3',
    title: 'nocturne',
    artist: 'jay chou',
  },
];

const Debug = () => {
  const dispatch = useAppDispatch();
  const { isSignIn } = useAppSelector(state => state.googleAuth);

  const { isTrackPlaySetUp, isMusicFolderSetUp } = useAppSelector(
    state => state.trackPlayer,
  );
  const { selectedFoldersId, musicFiles } = useAppSelector(
    state => state.googleDrive,
  );
  const getDebugInfo = async () => {
    console.log('is google signed in: ', isSignIn);
    console.log('google access token: ', getAccessToken());
    console.log('is track player setup: ', isTrackPlaySetUp);
    console.log('is music folder created: ', isMusicFolderSetUp);
    // console.log('music files', musicFiles);
    getFSInfo().then(res => console.log(res));
  };
  const signout = async () => {
    dispatch(googleSignOut());
  };
  const add = async () => {
    await TrackPlayer.add(track);
  };
  const test = async () => {
    downloadMusicByFileId(musicFiles[0].id);
  };
  const play = async () => {
    await TrackPlayer.play();
  };
  const skip = async () => {
    TrackPlayer.skipToNext();
  };
  const reset = async () => {
    TrackPlayer.reset();
  };
  const isPlaying = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      console.log('The player is playing');
    } else {
      console.log('The player is not playing');
    }
  };
  const getQueue = async () => {
    const queue = await TrackPlayer.getQueue();
    if (!_.isEmpty(queue)) {
      queue.map(song => console.log(song));
    } else {
      console.log('empty queue');
    }
  };
  const listAllFileInApp = async () => {
    listAllFilesFromApp();
  };
  const getCurrentTrack = async () => {
    const x = TrackPlayer.getCurrentTrack();
    console.log(x);
  };

  return (
    <View>
      <Button onPress={getDebugInfo} title="Debug" />
      <Button onPress={signout} title="signout" />
      <Button onPress={add} title="add" />
      <Button onPress={test} title="test" />
      <Button onPress={play} title="play" />
      <Button onPress={skip} title="skip" />
      <Button onPress={reset} title="reset" />
      <Button onPress={isPlaying} title="is playing" />
      <Button onPress={getQueue} title="get queue" />
      <Button onPress={getCurrentTrack} title="get current track" />
      <Button onPress={listAllFileInApp} title="list all file in app" />
    </View>
  );
};

export default Debug;
