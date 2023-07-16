import React, { useState } from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

import tw from '@src/config/twrnc';
import TrackPlayer, {
  Event,
  State,
  Track,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const PlayerController = () => {
  const playerState = usePlaybackState();
  const pause = () => TrackPlayer.pause();
  const play = () => TrackPlayer.play();
  const skipNext = () => TrackPlayer.skipToNext();

  const [currentSong, setCurrentSong] = useState<Track>({} as Track);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged) {
      const queue = await TrackPlayer.getQueue();
      setCurrentSong(queue[event.nextTrack]);
    }
  });

  return (
    <View
      style={tw`flex flex-row w-full h-12 border-t-2 border-t-gray-500 items-center px-5`}>
      <View style={tw`flex flex-col h-full w-3/4 justify-center`}>
        <Text style={tw`text-base font-medium`} ellipsizeMode="tail">
          {currentSong && currentSong.title}
        </Text>
        <Text style={tw`text-sm`}>{currentSong && currentSong.artist}</Text>
      </View>
      <View
        style={tw`flex flex-row h-full items-center justify-center flex-shrink flex-grow w-0`}>
        {playerState === State.Playing ? (
          <IconButton icon="pause" onPress={pause} />
        ) : (
          <IconButton icon="play" onPress={play} />
        )}
        <IconButton icon="skip-next" onPress={skipNext} />
      </View>
    </View>
  );
};

export default PlayerController;
