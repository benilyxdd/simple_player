export const list = {
  addFilter: (url: string, filter: string) => {
    const encodedFilter = encodeURI(filter)
      .replace(/'/g, '%27')
      .replace(/\//g, '%2F')
      .replace(/[=]/g, '%3D');
    return `${url}&q=${encodedFilter}`;
  },
};
