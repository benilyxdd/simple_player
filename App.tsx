/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';

function App(): JSX.Element {
  return (
    <PaperProvider>
      <Text>Hello</Text>
    </PaperProvider>
  );
}

export default App;
