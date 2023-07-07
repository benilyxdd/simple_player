import React from 'react';
import { View, Text } from 'react-native';

interface MusicContainerProps {
  name: string;
  author: string;
}

const MusicContainer: React.FC<MusicContainerProps> = ({ author, name }) => {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{author}</Text>
    </View>
  );
};

export default MusicContainer;
