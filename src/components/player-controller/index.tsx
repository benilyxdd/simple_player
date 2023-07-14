import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

import tw from '@src/config/twrnc';
import TrackPlayer, {
  State,
  usePlaybackState,
} from 'react-native-track-player';

const PlayerController = () => {
  const playerState = usePlaybackState();
  const pause = () => TrackPlayer.pause();
  const play = () => TrackPlayer.play();
  const skipNext = () => TrackPlayer.skipToNext();

  return (
    <View
      style={tw`flex flex-row w-full h-12 border-t-2 border-t-gray-500 items-center`}>
      {/* <IconButton icon="skip-previous" /> */}
      {playerState === State.Playing ? (
        <IconButton icon="pause" onPress={pause} />
      ) : (
        <IconButton icon="play" onPress={play} />
      )}
      <IconButton icon="skip-next" onPress={skipNext} />
    </View>
  );
};

export default PlayerController;
