import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

import MusicContainer from '@src/components/music-container';
import tw from '@src/config/twrnc';
import { useAppSelector } from '@src/redux/hooks';

const Library = () => {
  const { musicFiles } = useAppSelector(state => state.googleDrive);

  return (
    <View style={tw`flex-1`}>
      <Appbar.Header elevated={true}>
        <Appbar.Content title="Library" />
      </Appbar.Header>

      <FlashList
        data={musicFiles}
        renderItem={list => <MusicContainer music={list.item} />}
        removeClippedSubviews={true}
        estimatedItemSize={100}
      />
    </View>
  );
};

export default Library;
