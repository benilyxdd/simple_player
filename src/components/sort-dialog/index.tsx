import _ from 'lodash';
import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from 'react';
import { View } from 'react-native';
import {
  Button,
  Dialog,
  RadioButton,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import tw from '@src/config/twrnc';
import { useAppDispatch } from '@src/redux/hooks';
import { sortMusicFile } from '@src/redux/slices/google-drive/actions';
import * as AsyncStorageUtils from '@src/utilities/async-storage';

export type SortBy = 'title' | 'artist' | 'downloaded';
type Props = {};
export type SortDialogHandle = {
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const SortDialog = forwardRef<SortDialogHandle, Props>((_prop, ref) => {
  const dispatch = useAppDispatch();

  useImperativeHandle(ref, () => ({ setVisible }));

  const [visible, setVisible] = React.useState<boolean>(false);
  const [sortByState, setSortByState] = React.useState<SortBy>('title');

  const onDismiss = () => setVisible(false);
  const onSaveOption = () => {
    AsyncStorageUtils.setItem<SortBy>('sortBy', sortByState);
    dispatch(sortMusicFile({ sortBy: sortByState }));
    onDismiss();
  };

  useEffect(() => {
    AsyncStorageUtils.getItem<SortBy>('sortBy').then(sortby => {
      if (!_.isNull(sortby)) {
        setSortByState(sortby);
      }
    });
  }, []);

  return (
    <Dialog onDismiss={onDismiss} visible={visible}>
      <Dialog.Title>Sort By</Dialog.Title>

      <Dialog.Content>
        <TouchableRipple onPress={() => setSortByState('title')}>
          <View style={tw`flex flex-row items-center`}>
            <RadioButton
              value="title"
              status={sortByState === 'title' ? 'checked' : 'unchecked'}
              onPress={() => setSortByState('title')}
            />
            <Text>Title</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => setSortByState('artist')}>
          <View style={tw`flex flex-row items-center`}>
            <RadioButton
              value="artist"
              status={sortByState === 'artist' ? 'checked' : 'unchecked'}
              onPress={() => setSortByState('artist')}
            />
            <Text>Artist</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => setSortByState('downloaded')}>
          <View style={tw`flex flex-row items-center`}>
            <RadioButton
              value="downloaded"
              status={sortByState === 'downloaded' ? 'checked' : 'unchecked'}
              onPress={() => setSortByState('downloaded')}
            />
            <Text>Downloaded</Text>
          </View>
        </TouchableRipple>
      </Dialog.Content>

      <Dialog.Actions>
        <Button onPress={onDismiss}>Cancel</Button>
        <Button onPress={onSaveOption}>Ok</Button>
      </Dialog.Actions>
    </Dialog>
  );
});

export default SortDialog;
