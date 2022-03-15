export type MetatoolSongMetadata = {
    title: string;
    romTitle: string;
    language: string;
    timeSignature: string;
    tempo: number;
    durationMinSec: string;
    dateReleased: string;
    key: number;
    mode: number;
    artist: string;
    initialism: string;
};

type Option = {
    value: string;
    label: string;
};

export type Form = {
    id?: number;
    title?: string;
    romTitle?: string;
    artist?: string;

    key?: number;
    myKey?: number;
    mode?: number;
    tempo?: number;

    durationMinSec?: string;
    timeSignature?: string;
    language?: string;

    spotifyLink?: string;
    youtubeLink?: string;
    otherLink?: string;

    composers?: Option[];
    songwriters?: Option[];
    arrangers?: Option[];

    initialism?: string;

    acousticness?: number;
    danceability?: number;
    energy?: number;
    instrumentalness?: number;
    valence?: number;

    moods?: Option[];
    genres?: Option[];
    tags?: Option[];

    dateReleased?: string;
    durationMs?: number;

    status?: string;
    artistId?: number;
    languageId?: number;
};

export type Musician = {
    [key: string]: any;
    name: string;
    romName: string;
    spotifyName: string;
};

export type Song = {
    // [key: string] : any,
    id: number;
    title: string;
    romTitle: string;
    artist: Musician;
    artistId: number;

    tempo: number;

    createdAt?: Date;
    updatedAt?: Date;
    dateReleased: string;
    // durationMinSec: string,
    durationMs: number;
    timeSignature: string;

    initialism: string;

    key: number;
    myKey: number;
    languageId: number;
    language: { id: number; name: string };
    mode: number;

    spotifyLink: string;
    youtubeLink: string;
    otherLink: string;

    acousticness: number;
    valence: number;
    instrumentalness: number;
    danceability: number;
    energy: number;

    // verified: boolean,

    performStatus?: string;
    status: string;

    composers: Musician[];
    songwriters: Musician[];
    arrangers: Musician[];
    genres: { id: number; name: string }[];
    moods: { id: number; name: string }[];
    tags: { id: number; name: string }[];
    // enName: string,
};
