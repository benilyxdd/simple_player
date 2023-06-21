/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from '@src/navigations';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import store from '@src/redux/store';

function App(): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <PaperProvider>
          <MainNavigator />
        </PaperProvider>
      </NavigationContainer>
    </ReduxProvider>
  );
}

export default App;
