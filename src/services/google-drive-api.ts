import { downloadFile, readDir } from 'react-native-fs';

// constants
import { FIELDS_PARAM, FILES } from '@src/constants/google-apis/drive';
import { MUSIC_FOLDER } from '@src/constants/path';

// Types
import { ListResponse } from '@src/types/google-apis/drive/files';
import { Music } from '@src/types/music';

// Utils
import { setDownloadParam, setFieldsParam } from '@src/utilities/google-apis';
import { list } from '@src/utilities/google-apis/drive';

let ACCESS_TOKEN = '';

export const setAccessToken = (key: string) => (ACCESS_TOKEN = key);
export const getAccessToken = () => ACCESS_TOKEN;

export const fetchFolders = async (): Promise<ListResponse['files']> => {
  try {
    const url = list.addFilter(
      FILES.LIST,
      "name contains 'music' and mimeType='application/vnd.google-apps.folder'",
    );

    const response = await fetch(url, {
      headers: new Headers({ Authorization: `Bearer ${ACCESS_TOKEN}` }),
    });
    const json = (await response.json()) as ListResponse;

    return json.files; // which is the folders
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchAllMusicByFolderId = async (
  folderId: string,
): Promise<Array<Music>> => {
  try {
    const url = list.addFilter(FILES.LIST, `'${folderId}' in parents`);
    const url2 = setFieldsParam(url, FIELDS_PARAM.LIST);
    const response = await fetch(url2, {
      headers: new Headers({ Authorization: `Bearer ${ACCESS_TOKEN}` }),
    });
    const json = (await response.json()) as ListResponse;
    const formattedFiles = json.files.map(file => {
      // original name: Anne Marie - 2002.mp3
      // format:        [Artist]   - [Song Name]
      const { name, id } = file;
      const isInFormat = /[\w ]+-[\w()'. ]+.mp3/.test(name);

      if (isInFormat) {
        // get [Artist] from original format
        const artist = name.split(' - ')[0].trim();

        // get [Song Name] from original format;
        const title = name
          .split(' - ')[1]
          .replace('.mp3', '') // fetching from google drive api will also keep the extension, removing it
          .replace(/-/g, '') // song name with "'" will somehow generate a '-' when fetching from google drive api, removing all of them
          .trim();

        return { id, title, artist: artist };
      }

      return { id, title: name, artist: '' };
    });
    return formattedFiles;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const downloadMusicByFileId = async (fileId: string) => {
  try {
    const url = setDownloadParam(FILES.GET(fileId));
    const headers = { Authorization: `Bearer ${ACCESS_TOKEN}` };

    await downloadFile({
      fromUrl: url,
      toFile: MUSIC_FOLDER + fileId + '.mp3',
      headers: headers,
    }).promise.then(() => null);
  } catch (err) {
    console.log(err);
  }
};

// debug
export const listAllFilesFromApp = async () => {
  try {
    await readDir(MUSIC_FOLDER).then(ok => {
      console.log(ok);
    });
  } catch (err) {
    console.log(err);
  }
};
