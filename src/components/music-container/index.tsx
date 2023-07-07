import React from 'react';
import { Text, View } from 'react-native';

import PressableOpacity from '@src/components/pressable-opacity';
import tw from '@src/config/twrnc';
import { Music } from '@src/types/music';

interface MusicContainerProps {
  music: Music;
}

const MusicContainer: React.FC<MusicContainerProps> = ({ music }) => {
  const { author, id, name } = music;
  const containerOnPress = () => {};

  return (
    <PressableOpacity
      style={tw`flex flex-row border-b border-gray-500`}
      onPress={containerOnPress}>
      <View style={tw`flex flex-col w-4/5`}>
        <Text
          style={tw`text-base font-medium`}
          numberOfLines={1}
          ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={tw`text-md`}>{author}</Text>
      </View>
      <View style={tw`flex justify-center items-center w-1/5`}>
        <Text>download</Text>
      </View>
    </PressableOpacity>
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
