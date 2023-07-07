import React from 'react';
import { FlatList, View } from 'react-native';

import MusicContainer from '@src/components/music-container';
import { useAppSelector } from '@src/redux/hooks';
import { Appbar } from 'react-native-paper';

const Library = () => {
  const { musicFiles } = useAppSelector(state => state.googleDrive);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header elevated={true}>
        <Appbar.Content title="Library" />
      </Appbar.Header>

      <FlatList
        data={musicFiles}
        renderItem={list => {
          const { name, id, author } = list.item;
          return <MusicContainer name={name} author={author} />;
        }}
      />
    </View>
  );
};

export default Library;
