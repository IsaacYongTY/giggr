import { Song } from 'common/types';
import { previousMonday, isAfter } from 'date-fns';

export const deriveSongsAddedThisWeek = (songs: Song[]) => {
    const result = songs.filter((song) =>
        isAfter(song.createdAt || Date.now(), previousMonday(Date.now())),
    );
    return result.length;
};
