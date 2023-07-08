import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

export enum AsyncStorageKey {
  selectedFolders = 'selectedFolders',
  downloadedMusic = 'downloadedMusic',
}

// get actual value from AsyncStorageKey, in case there is difference between enum key and value
const getStorageKey = (key: keyof typeof AsyncStorageKey): string =>
  AsyncStorageKey[key];

export const setItem = async <T>(
  key: keyof typeof AsyncStorageKey,
  value: T,
): Promise<void> => {
  try {
    const jsonData = JSON.stringify(value);
    await AsyncStorage.setItem(getStorageKey(key), jsonData);
  } catch (err) {
    console.error(`AsyncStorage: Error saving data for key '${key}'`);
  }
};

export const getItem = async <T>(
  key: keyof typeof AsyncStorageKey,
): Promise<T | null> => {
  try {
    const jsonData = await AsyncStorage.getItem(getStorageKey(key));
    return _.isNull(jsonData) ? jsonData : JSON.parse(jsonData);
  } catch (err) {
    console.error(`AsyncStorage: Error getting data for key '${key}'`);
    return null;
  }
};
