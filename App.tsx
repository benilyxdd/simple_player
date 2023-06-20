/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Text>Hello</Text>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
