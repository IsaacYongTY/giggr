import { Form } from 'common/types';
import { MetatoolSongMetadata } from './types';
import { majorKeyArray, minorKeyArray, noteArray } from './constants';

export const deriveMetatoolSongMetadata = (
    data: Form,
): MetatoolSongMetadata => ({
    title: data.title || '',
    romTitle: data.romTitle || '',
    artist: data.artist || '',
    language: data.language || '',
    dateReleased: data.dateReleased || '',
    initialism: data.initialism || '',
});

export const convertDurationMsToMinSec = (durationMs: number): string => {
    if (durationMs < 0) return '';

    const timeInSec = Math.round(durationMs / 1000);
    const min = Math.floor(timeInSec / 60);
    const sec = Math.round(timeInSec - min * 60);

    const resultSec = sec < 10 ? `0${sec}` : sec;

    return `${min}:${resultSec}`;
};

type EnharmonicPair = {
    [field: string]: string;
};

export const convertEnharmonic = (keyString: string): string => {
    let modeString;
    if (keyString[keyString.length - 1].toLowerCase() === 'm') {
        modeString = keyString[keyString.length - 1];
        keyString = keyString.substring(0, keyString.length - 1);
    }

    if (keyString.length > 2) return '';

    const note = keyString.replace(/[#b]/g, '');

    const accidental = keyString[keyString.length - 1];

    if (!/[A-Ga-g]/g.test(note) || note.length !== 1) return '';

    if (accidental !== '#' && accidental !== 'b') {
        return keyString;
    }

    const enharmonicPair: EnharmonicPair = {
        Db: 'C#',
        Eb: 'D#',
        Gb: 'F#',
        Ab: 'G#',
        Bb: 'A#',
    };

    const result =
        accidental === '#'
            ? Object.keys(enharmonicPair).find(
                  (element) => enharmonicPair[element] === keyString,
              )
            : enharmonicPair[keyString];

    return result + (modeString ? modeString : '');
};

export const convertKeyModeIntToKey = (
    key: number | undefined | null,
    mode: number | undefined | null,
): string => {
    if (
        key === undefined ||
        mode === undefined ||
        key === null ||
        mode === null
    )
        return '';
    if (key > 11 || key < 0 || mode > 1 || mode < 0) return '';

    let keyString = noteArray[key];

    if (mode === 0) {
        keyString += 'm';
    }

    if (keyString === 'Dbm' || keyString === 'Gbm' || keyString === 'Abm') {
        return convertEnharmonic(keyString);
    }

    return keyString;
};

export const convertKeyToKeyModeInt = (keyString: string): number[] => {
    let note;
    let mode = 1;

    if (!keyString) {
        return [-1, -1];
    }
    if (keyString[keyString.length - 1] === 'm') {
        mode = 0;
        note = keyString.slice(0, keyString.length - 1);
    } else {
        note = keyString;
    }

    //enharmonic
    if (note === 'C#') {
        note = 'Db';
    }

    if (note === 'F#') {
        note = 'Gb';
    }

    if (note === 'G#') {
        note = 'Ab';
    }

    if (!noteArray.includes(note)) return [-1, -1];

    return [noteArray.indexOf(note), mode];
};

export const convertRelativeKey = (keyString: string): string => {
    if (
        !majorKeyArray.includes(keyString) &&
        !minorKeyArray.includes(keyString)
    ) {
        return '';
    }

    const isMinor = keyString.includes('m');

    let foundIndex;
    if (isMinor) {
        foundIndex = minorKeyArray.findIndex((key) => key === keyString);
        return majorKeyArray[foundIndex];
    }

    foundIndex = majorKeyArray.findIndex((key) => key === keyString);
    return minorKeyArray[foundIndex];
};
