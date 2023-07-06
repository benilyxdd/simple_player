import React from 'react';
import { FlatList, View, Text } from 'react-native';

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
          const { name } = list.item;
          return (
            <View>
              <Text>{name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Library;
