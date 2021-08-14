interface Option {
    value: string;
    label: string;
}

export default interface Form {
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

    // temporary until I understand how to make type flexible
    progression?: string;
    isFullBar?: boolean;
    spaces?: number;

    status?: string;

    artistId?: number;
    languageId?: number;
    durationMs?: number;
    // verified?: boolean
}
