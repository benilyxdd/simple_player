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

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <PaperProvider>
        <MainNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
