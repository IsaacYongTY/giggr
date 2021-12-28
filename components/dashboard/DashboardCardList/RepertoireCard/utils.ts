import Song from '../../../../lib/types/song';
import { previousMonday, isAfter } from 'date-fns';

export const deriveSongsAddedThisWeek = (songs: Song[]) => {
    console.log(previousMonday(Date.now()));

    const result = songs.filter((song) =>
        isAfter(song.createdAt || Date.now(), previousMonday(Date.now()))
    );
    return result.length;
};
