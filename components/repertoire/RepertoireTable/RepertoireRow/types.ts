import { Musician, Song } from 'common/types';

// keeping it for now during refactoring, eventually we hope to stop using such huge and vague type
export type Data = {
    songs: Song[];
    musicians: Musician[];
    genres: { id: number; name: string }[];
    tags: { id: number; name: string }[];
    moods: { id: number; name: string }[];
    languages: { id: number; name: string }[];
}