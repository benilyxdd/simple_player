import { FlashList } from '@shopify/flash-list';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';

import MusicContainer from '@src/components/music-container';
import SortDialog, { SortDialogHandle } from '@src/components/sort-dialog';
import tw from '@src/config/twrnc';
import { useAppSelector } from '@src/redux/hooks';

const Library = () => {
  const { musicFiles } = useAppSelector(state => state.googleDrive);
  const sortDialogRef = useRef<SortDialogHandle>(null);

  return (
    <View style={tw`flex-1`}>
      <Appbar.Header elevated={true}>
        <Appbar.Content title="Library" />
        <IconButton
          icon="sort"
          onPress={() => sortDialogRef.current?.setVisible(true)}
        />
      </Appbar.Header>

      <FlashList
        data={musicFiles}
        renderItem={list => <MusicContainer music={list.item} />}
        removeClippedSubviews={true}
        estimatedItemSize={100}
      />

      <SortDialog ref={sortDialogRef} />
    </View>
  );
};

export default Library;
