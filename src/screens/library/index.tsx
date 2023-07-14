import { FlashList } from '@shopify/flash-list';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';

import MusicContainer from '@src/components/music-container';
import PlayerController from '@src/components/player-controller';
import SortDialog, { SortDialogHandle } from '@src/components/sort-dialog';
import tw from '@src/config/twrnc';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks';
import { downloadMassMusic } from '@src/redux/slices/track-player/actions';

const Library = () => {
  const dispatch = useAppDispatch();
  const { musicFiles } = useAppSelector(state => state.googleDrive);
  const { downloadedMusic } = useAppSelector(state => state.trackPlayer);
  const sortDialogRef = useRef<SortDialogHandle>(null);

  const downloadAll = async () => {
    const unDownloadedMusicIds = musicFiles
      .filter(music => !downloadedMusic[music.id])
      .map(music => music.id);

    dispatch(downloadMassMusic({ ids: unDownloadedMusicIds }));
  };

  return (
    <View style={tw`flex-1`}>
      <Appbar.Header elevated={true}>
        <Appbar.Content title="Library" />
        <IconButton icon="cloud-download" onPress={downloadAll} />
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

      <PlayerController />

      <SortDialog ref={sortDialogRef} />
    </View>
  );
};

export default Library;
