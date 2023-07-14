import _ from 'lodash';

import { SortBy } from '@src/components/sort-dialog';
import { Music } from '@src/types/music';

export const sortBy = (
  method: SortBy,
  music: Array<Music>,
  downloadedMusic: { [key: string]: boolean },
) => {
  switch (method) {
    case 'title':
      return music.slice().sort((a, b) => a.title.localeCompare(b.title));
    case 'artist':
      return music.slice().sort((a, b) => {
        if (_.isEmpty(a.artist) || _.isNull(a.artist)) {
          return 1;
        }

        if (_.isEmpty(b.artist) || _.isNull(b.artist)) {
          return -1;
        }

        return a.artist.localeCompare(b.artist);
      });
    case 'downloaded':
      return music.slice().sort((a, b) => {
        if (!downloadedMusic[a.id]) {
          return 1;
        }

        if (!downloadedMusic[b.id]) {
          return -1;
        }

        return a.title.localeCompare(b.title);
      });
    default:
      return music;
  }
};
