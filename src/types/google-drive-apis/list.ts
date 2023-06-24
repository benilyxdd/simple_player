type File = {
  id: string;
  kind: string;
  mimeType: string;
  name: string;
};

export type Response = {
  nextPageToken: string;
  kind: string;
  incompleteSearch: boolean;
  files: Array<File>;
};

// export type GetFolderRequestFile = Omit<File, 'kind' | 'mimeType'> & {
//   kind: 'drive#file';
//   mimeType: 'application/vnd.google-apps.folder';
// };
export type GetFolderRequestFile = {
  id: string;
  kind: 'drive#file';
  mimeType: 'application/vnd.google-apps.folder';
  name: string;
};
