import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Appbar, List } from 'react-native-paper';

import { useAppDispatch, useAppSelector } from '@src/redux/hooks';
import { googleSignIn } from '@src/redux/slices/google-auth/actions';
import { googleDriveSlice } from '@src/redux/slices/google-drive';
import { googleDriveFetchFolders } from '@src/redux/slices/google-drive/actions';

const NotSignInListItems = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <List.Item
        // eslint-disable-next-line react/no-unstable-nested-components
        left={props => <List.Icon {...props} icon="login" />}
        title="Click Here to Sign In"
        onPress={() => dispatch(googleSignIn())}
      />
    </>
  );
};

const SignedInListItems = () => {
  const dispatch = useAppDispatch();
  const { folders, selectedFoldersId } = useAppSelector(
    state => state.googleDrive,
  );

  const selectFolder = (id: string) => {
    const newFolderIds = [...selectedFoldersId, id];
    return newFolderIds;
  };

  const unselectedFolder = (id: string) => {
    const newFolderIds = selectedFoldersId.filter(str => str !== id);
    return newFolderIds;
  };

  const onPressFolder = (id: string) => {
    const isSelected = selectedFoldersId.includes(id);
    const newFolderIds = isSelected ? unselectedFolder(id) : selectFolder(id);
    dispatch(googleDriveSlice.actions.updatedSelectedFoldersId(newFolderIds));
  };

  const radioboxStatus = (id: string) => {
    return selectedFoldersId.includes(id)
      ? 'checkbox-outline'
      : 'checkbox-blank-outline';
  };

  return (
    <>
      {folders &&
        folders.map(folder => {
          return (
            <List.Item
              title={folder.name}
              key={folder.id}
              // eslint-disable-next-line react/no-unstable-nested-components
              left={props => <List.Icon {...props} icon="folder" />}
              // eslint-disable-next-line react/no-unstable-nested-components
              right={props => (
                <List.Icon
                  {...props}
                  icon={folder.id ? radioboxStatus(folder.id) : 'blank'}
                />
              )}
              onPress={_e => onPressFolder(folder.id)}
            />
          );
        })}
      {/* TODO: add save changes button, save changes button should only dispatch once */}
      {/* <List.Item
        title={'Save Changes'}
        // eslint-disable-next-line react/no-unstable-nested-components
        right={props => <List.Icon {...props} icon={'check'} />}
        // eslint-disable-next-line react/no-unstable-nested-components
        left={props => <List.Icon {...props} icon={'blank'} />}
      /> */}
    </>
  );
};

const Setting = () => {
  const dispatch = useAppDispatch();
  const { isSignIn } = useAppSelector(state => state.googleAuth);

  useEffect(() => {
    dispatch(googleDriveFetchFolders());
  }, [isSignIn, dispatch]);

  return (
    <View>
      <Appbar.Header elevated={true}>
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <List.Accordion
        title={`Google Drive ${isSignIn ? '(Connected)' : '(Not Connected)'}`}
        description={`${
          isSignIn ? "Folders that contain 'music' keyword" : ''
        }`}
        // eslint-disable-next-line react/no-unstable-nested-components
        left={props => <List.Icon {...props} icon="google-drive" />}>
        {!isSignIn && <NotSignInListItems />}
        {isSignIn && <SignedInListItems />}
      </List.Accordion>
    </View>
  );
};

export default Setting;
