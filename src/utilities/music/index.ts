import _ from 'lodash';

import { SortBy } from '@src/components/sort-dialog';
import { Music } from '@src/types/music';

export const sortBy = (method: SortBy, music: Array<Music>) => {
  switch (method) {
    case 'title':
      return music.slice().sort((a, b) => a.name.localeCompare(b.name));
    case 'author':
      return music.slice().sort((a, b) => {
        if (_.isEmpty(a.author) || _.isNull(a.author)) {
          return 1;
        }

        if (_.isEmpty(b.author) || _.isNull(b.author)) {
          return -1;
        }

        return a.author.localeCompare(b.author);
      });
    case 'downloaded':
      return music;
    default:
      return music;
  }
};
