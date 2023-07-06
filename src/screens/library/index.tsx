import React from 'react';
import { View } from 'react-native';

import { useAppSelector } from '@src/redux/hooks';
import { Appbar } from 'react-native-paper';

const Library = () => {
  const { musicFiles } = useAppSelector(state => state.googleDrive);

  return (
    <View>
      <Appbar.Header elevated={true}>
        <Appbar.Content title="Library" />
      </Appbar.Header>
    </View>
  );
};

export default Library;
