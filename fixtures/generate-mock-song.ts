import { Song } from 'common/types';
import { convertKeyToKeyModeInt } from '../common/utils';

export const generateMockSong = (
    title: string,
    keyString: string,
    createdDate: Date,
): Song => {
    const [key, mode] = convertKeyToKeyModeInt(keyString);

    return {
        id: 1,
        title: title,
        romTitle: '',
        key: key,
        mode: mode,
        artist: {
            name: '',
            romName: '',
            spotifyName: '',
        },
        artistId: 1,
        tempo: 93,
        durationMs: 240000,
        timeSignature: '4/4',
        initialism: 'qt',
        dateReleased: '2013-01-01',
        updatedAt: createdDate,
        createdAt: createdDate,
        myKey: -1,
        languageId: 1,
        language: { id: 1, name: 'Mandarin' },
        spotifyLink: '',
        youtubeLink: '',
        otherLink: '',
        performStatus: '',
        status: '',
        acousticness: 0,
        valence: 0,
        instrumentalness: 0,
        danceability: 0,
        energy: 0,
        composers: [],
        songwriters: [],
        arrangers: [],
        genres: [],
        moods: [],
        tags: [],
    };
};
