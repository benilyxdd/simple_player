import React from 'react';
import { FlatList, View } from 'react-native';
import { Appbar } from 'react-native-paper';

import MusicContainer from '@src/components/music-container';
import { useAppSelector } from '@src/redux/hooks';
import tw from '@src/config/twrnc';

const Library = () => {
  const { musicFiles } = useAppSelector(state => state.googleDrive);

  return (
    <View style={tw`flex-1`}>
      <Appbar.Header elevated={true}>
        <Appbar.Content title="Library" />
      </Appbar.Header>

      <FlatList
        data={musicFiles}
        renderItem={list => <MusicContainer music={list.item} />}
      />
    </View>
  );
};

export default Library;
