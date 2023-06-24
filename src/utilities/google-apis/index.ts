/**
 *
 * @param url (string)
 * @param fields Array<field>
 * @returns updated url (string)
 *
 * @url https://developers.google.com/drive/api/reference/rest/v3/files#File
 * Fields can be found from the above link
 */
export const setFieldsParam = (url: string, fields: Array<string>) => {
  const fieldStr = fields.join(',');
  const updatedFields = `files(${fieldStr})`;
  return `${url}&fields=${updatedFields}`;
};
