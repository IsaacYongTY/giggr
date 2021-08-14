import Musician from './musician';

export interface Artist {
    [key: string]: any;
    name: string;
    romName: string;
    spotifyName: string;
}

export default interface Song {
    // [key: string] : any,
    id: number;
    title: string;
    romTitle: string;
    artist: Artist;
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
}
