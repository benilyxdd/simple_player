import { KEY } from '@src/constants/google-apis';

export const FILES = {
  GET: (fileId: string) =>
    `https://www.googleapis.com/drive/v3/files/${fileId}?key=${KEY}`,
  LIST: `https://www.googleapis.com/drive/v3/files?key=${KEY}`,
};

export const FIELDS_PARAM = {
  LIST: 'nextPageToken,incompleteSearch,files(id,name)',
};
