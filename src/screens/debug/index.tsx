import React from 'react';
import { Button, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '@src/redux/hooks';
import { googleSignOut } from '@src/redux/slices/google-auth/actions';
import { getAccessToken } from '@src/services/google-drive-api';
import TrackPlayer from 'react-native-track-player';

const track = [
  {
    url: 'https://free-mp3-download.net/tmp/c8b8e624ed2523157365cc98a8a91aaf/Anne-Marie%20-%202002.mp3',
    title: '2002',
    artist: 'anna',
  },
];

const Debug = () => {
  const dispatch = useAppDispatch();
  const { isSignIn } = useAppSelector(state => state.googleAuth);
  const { isSetUp } = useAppSelector(state => state.trackPlayer);
  const { selectedFoldersId, musicFiles } = useAppSelector(
    state => state.googleDrive,
  );
  const getDebugInfo = async () => {
    console.log('is google signed in: ', isSignIn);
    console.log('google access token: ', getAccessToken());
    console.log('is track player setup: ', isSetUp);
    console.log('music files', musicFiles);
  };
  const signout = async () => {
    dispatch(googleSignOut());
  };
  const add = async () => {
    await TrackPlayer.add(track);
  };
  const test = async () => {
    // fetchFilesInsideFolder(selectedFoldersId[0]);
  };
  const play = async () => {
    TrackPlayer.play();
  };
  const skip = async () => {
    TrackPlayer.skipToNext();
  };

  return (
    <View>
      <Button onPress={getDebugInfo} title="Debug" />
      <Button onPress={signout} title="signout" />
      <Button onPress={add} title="add" />
      <Button onPress={test} title="test" />
      <Button onPress={play} title="play" />
      <Button onPress={skip} title="skip" />
    </View>
  );
};

export default Debug;
