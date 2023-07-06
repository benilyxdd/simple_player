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

export const fetchFilesInsideFolder = async (folderId: string) => {
  try {
    const url = list.addFilter(FILES.LIST, `'${folderId}' in parents`);
    const url2 = setFieldsParam(url, FIELDS_PARAM.LIST);
    const response = await fetch(url2, {
      headers: new Headers({ Authorization: `Bearer ${ACCESS_TOKEN}` }),
    });
    const json = (await response.json()) as ListResponse;
    return json.files;
  } catch (err) {
    console.log(err);
    return [];
  }
};
