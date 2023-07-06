/**
 *
 * @param url (string)
 * @param fields Array<field>
 * @returns updated url (string)
 *
 * @url https://developers.google.com/drive/api/reference/rest/v3/files#File
 * Fields can be found from the above link
 */
export const setFieldsParam = (url: string, fields: string) => {
  return `${url}&fields=${fields}`;
};

export const setDownloadParam = (url: string) => {
  return `${url}&alt=media`;
};
