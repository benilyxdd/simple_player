import { GOOGLE_APIS } from '@src/constants/google-apis';

import {
  GetFolderRequestFile,
  Response as GetListRequestResponse,
} from '@src/types/google-drive-apis/list';
import { list } from '@src/utilities/google-apis/drive';

let ACCESS_TOKEN = '';

export const setAccessToken = (key: string) => (ACCESS_TOKEN = key);
export const getAccessToken = () => ACCESS_TOKEN;

export const fetchFolders = async (): Promise<Array<GetFolderRequestFile>> => {
  try {
    const url = list.addFilter(
      GOOGLE_APIS.DRIVE,
      "name contains 'music' and mimeType='application/vnd.google-apps.folder'",
    );

    const response = await fetch(url, {
      headers: new Headers({
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      }),
    });
    const json = (await response.json()) as Omit<
      GetListRequestResponse,
      'files'
    > & { files: Array<GetFolderRequestFile> };

    return json.files; // which is the folders
  } catch (err) {
    console.error(err);
    return [];
  }
};
