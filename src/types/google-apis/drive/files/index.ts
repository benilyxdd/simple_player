// general, only listed what we want
type File = {
  id: string;
  name: string;
};

// api responses
export type ListResponse = {
  nextPageToken: string;
  incompleteSearch: boolean;
  files: Array<File>;
};
