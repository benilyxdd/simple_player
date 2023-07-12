import React from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import TrackPlayer from 'react-native-track-player';

import PressableOpacity from '@src/components/pressable-opacity';
import tw from '@src/config/twrnc';
import { TRACK_PLAYER_URI } from '@src/constants/path';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks';
import { downloadMusic } from '@src/redux/slices/track-player/actions';
import { Music } from '@src/types/music';

interface MusicContainerProps {
  music: Music;
}

const MusicContainer: React.FC<MusicContainerProps> = ({ music }) => {
  const { author, id, name } = music;
  const { downloadedMusic, downloadingMusic } = useAppSelector(
    state => state.trackPlayer,
  );
  const dispatch = useAppDispatch();

  const onContainerPress = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add({
      title: name,
      artist: author,
      url: TRACK_PLAYER_URI(id),
    });
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
          {name}
        </Text>
        <Text style={tw`text-sm`}>{author}</Text>
      </PressableOpacity>
      <View style={tw`flex justify-center items-center w-1/8`}>
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
    author: '',
    name: '',
  },
};

export default MusicContainer;
