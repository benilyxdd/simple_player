// Types
import { ListResponse } from '@src/types/google-apis/drive/files';

// Utils
import { FIELDS_PARAM, FILES } from '@src/constants/google-apis/drive';
import { setFieldsParam } from '@src/utilities/google-apis';
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

export const fetchAllMusicByFolderId = async (folderId: string) => {
  try {
    const url = list.addFilter(FILES.LIST, `'${folderId}' in parents`);
    const url2 = setFieldsParam(url, FIELDS_PARAM.LIST);
    const response = await fetch(url2, {
      headers: new Headers({ Authorization: `Bearer ${ACCESS_TOKEN}` }),
    });
    const json = (await response.json()) as ListResponse;
    const formattedFiles = json.files.map(file => {
      // original name: Anne Marie - 2002.mp3
      // format:        [Author]   - [Song Name]
      const { name } = file;

      // get [Author] from original format
      const author = name.split(' - ')[0].trim();

      // get [Song Name] from original format;
      const newName = name
        .split(' - ')[1]
        .replace('.mp3', '') // fetching from google drive api will also keep the extension, removing it
        .replace(/-/g, '') // song name with "'" will somehow generate a '-' when fetching from google drive api, removing all of them
        .trim();

      return { ...file, name: newName, author };
    });
    return formattedFiles;
  } catch (err) {
    console.log(err);
    return [];
  }
};
