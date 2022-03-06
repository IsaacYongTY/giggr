import { Form, Song } from 'common/types';

export const convertDurationMinSecToMs = (durationMinSec: string): number => {
    if (!durationMinSec.includes(':')) return -1;
    if (durationMinSec.split(':')[1].length !== 2) return -1;

    const [min, sec] = durationMinSec
        .split(':')
        .map((element) => parseInt(element));

    if (sec >= 60) return -1;

    return (min * 60 + sec) * 1000;
};

export const convertSongFormToTempSong = (form: Form): Song => ({
    id: form.id || -1,
    title: form.title || '',
    romTitle: form.romTitle || '',
    key: form.key || -1,
    myKey: form.myKey || -1,
    mode: form.mode || -1,
    tempo: form.tempo || 0,
    timeSignature: form.timeSignature || '',

    spotifyLink: form.spotifyLink || '',
    youtubeLink: form.youtubeLink || '',
    otherLink: form.otherLink || '',

    initialism: form.initialism || '',

    acousticness: 0,
    danceability: 0,
    energy: 0,
    instrumentalness: 0,
    valence: 0,
    dateReleased: '',

    status: form.status || '',
    languageId: -1,
    durationMs: convertDurationMinSecToMs(form.durationMinSec || '') || 0,
    artist: {
        name: form.artist || '',
        romName: '',
        spotifyName: '',
    },
    artistId: -1,
    language: { id: 1, name: form.language || '' },
    composers:
        form.composers?.map((composer) => ({
            name: composer.value,
            romName: '',
            spotifyName: '',
        })) || [],
    songwriters:
        form.songwriters?.map((songwriter) => ({
            name: songwriter.value,
            romName: '',
            spotifyName: '',
        })) || [],
    arrangers:
        form.arrangers?.map((arranger) => ({
            name: arranger.value,
            romName: '',
            spotifyName: '',
        })) || [],
    genres: form.genres?.map((genre) => ({ id: -1, name: genre.value })) || [],
    moods: form.moods?.map((mood) => ({ id: -1, name: mood.value })) || [],
    tags: form.tags?.map((tags) => ({ id: -1, name: tags.value })) || [],
});
