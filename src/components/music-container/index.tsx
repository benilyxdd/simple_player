import React from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import TrackPlayer from 'react-native-track-player';

import PressableOpacity from '@src/components/pressable-opacity';
import tw from '@src/config/twrnc';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks';
import { downloadMusic } from '@src/redux/slices/track-player/actions';
import { Music } from '@src/types/music';

interface MusicContainerProps {
  music: Music;
}

const MusicContainer: React.FC<MusicContainerProps> = ({ music }) => {
  const { artist, id, title } = music;
  const { downloadedMusic, downloadingMusic } = useAppSelector(
    state => state.trackPlayer,
  );
  const dispatch = useAppDispatch();

  const onContainerPress = async () => {
    const queue = await TrackPlayer.getQueue();
    const musicIndex = queue.findIndex(track => track.title === title);
    await TrackPlayer.skip(musicIndex);
    await TrackPlayer.play();
  };
  const onDownloadPress = async () => {
    dispatch(downloadMusic({ id }));
  };

  const isDownloaded = downloadedMusic[id];
  const isDownloading = downloadingMusic[id];

  return (
    <View style={tw`flex flex-row border-b border-gray-500`}>
      <PressableOpacity
        disabled={!isDownloaded || isDownloading}
        style={tw`flex flex-col w-7/8`}
        onPress={onContainerPress}>
        <Text
          style={tw`text-base font-medium`}
          numberOfLines={1}
          ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={tw`text-sm`}>{artist}</Text>
      </PressableOpacity>
      <View style={tw`flex flex-row justify-center items-center w-1/8`}>
        {isDownloaded ? (
          <IconButton icon="check" size={20} />
        ) : isDownloading ? (
          <ActivityIndicator />
        ) : (
          <IconButton
            icon="cloud-download"
            size={20}
            onPress={onDownloadPress}
          />
        )}
      </View>
    </View>
  );
};

MusicContainer.defaultProps = {
  music: {
    id: '-1',
    artist: '',
    title: '',
  },
};

export default MusicContainer;
