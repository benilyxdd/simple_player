import { DocumentDirectoryPath } from 'react-native-fs';

export const MUSIC_FOLDER = `${DocumentDirectoryPath}/music/`;
export const TRACK_PLAYER_URI = (id: string) =>
  `file://${MUSIC_FOLDER}/${id}.mp3`;
