import React from 'react';
import { View } from 'react-native';
import { Appbar, List } from 'react-native-paper';

import { useAppDispatch, useAppSelector } from '@src/redux/hooks';
import { googleSignIn } from '@src/redux/slices/google-auth/actions';

const NotSignInListItems = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <List.Item
        // eslint-disable-next-line react/no-unstable-nested-components
        left={props => <List.Icon {...props} icon="open-in-new" />}
        title="Click Here to Sign In"
        onPress={() => dispatch(googleSignIn())}
      />
    </>
  );
};

const SignedInListItems = () => {
  return (
    <>
      <List.Item title="signed in" />
    </>
  );
};

const Setting = () => {
  const { isSignIn } = useAppSelector(state => state.googleAuth);

  return (
    <View>
      <Appbar.Header elevated={true}>
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <List.Accordion
        title={`Google Drive ${isSignIn ? '(Connected)' : '(Not Connected)'}`}
        // eslint-disable-next-line react/no-unstable-nested-components
        left={props => <List.Icon {...props} icon="google-drive" />}>
        {!isSignIn && <NotSignInListItems />}
        {isSignIn && <SignedInListItems />}
      </List.Accordion>
    </View>
  );
};

export default Setting;
