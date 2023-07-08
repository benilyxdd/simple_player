import React from 'react';
import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import PressableOpacity from '@src/components/pressable-opacity';
import tw from '@src/config/twrnc';
import { Music } from '@src/types/music';

interface MusicContainerProps {
  music: Music;
}

const MusicContainer: React.FC<MusicContainerProps> = ({ music }) => {
  const { author, id, name } = music;
  const onContainerPress = () => {};
  const onDownloadPress = () => {};

  return (
    <View style={tw`flex flex-row border-b border-gray-500`}>
      <PressableOpacity
        style={tw`flex flex-col w-4/5`}
        onPress={onContainerPress}>
        <Text
          style={tw`text-base font-medium`}
          numberOfLines={1}
          ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={tw`text-sm`}>{author}</Text>
      </PressableOpacity>
      <View style={tw`flex justify-center items-end w-1/5`}>
        <IconButton icon="camera" size={20} onPress={onDownloadPress} />
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
