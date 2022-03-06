import {
    convertDurationMsToMinSec,
    convertEnharmonic,
    convertKeyModeIntToKey,
    convertKeyToKeyModeInt,
    convertRelativeKey,
} from './utils';

describe('convertDurationMsToMinSec', () => {
    it('should convert milliseconds to mm:ss format', () => {
        expect(convertDurationMsToMinSec(300000)).toBe('5:00');
        expect(convertDurationMsToMinSec(59000)).toBe('0:59');
        expect(convertDurationMsToMinSec(61000)).toBe('1:01');
        expect(convertDurationMsToMinSec(0)).toBe('0:00');
        expect(convertDurationMsToMinSec(1000)).toBe('0:01');
        expect(convertDurationMsToMinSec(100)).toBe('0:00');
        expect(convertDurationMsToMinSec(500)).toBe('0:01');
    });

    it('should return undefined if value provided is negative', () => {
        expect(convertDurationMsToMinSec(-300000)).toBe('');
        expect(convertDurationMsToMinSec(-1)).toBe('');
    });
});

describe('convertEnharmonic', () => {
    it("should return the same value if there's no enharmonic equivalent", () => {
        expect(convertEnharmonic('C')).toBe('C');
        expect(convertEnharmonic('D')).toBe('D');
        expect(convertEnharmonic('E')).toBe('E');
        expect(convertEnharmonic('F')).toBe('F');
        expect(convertEnharmonic('G')).toBe('G');
        expect(convertEnharmonic('A')).toBe('A');
        expect(convertEnharmonic('B')).toBe('B');
    });

    it('should return the enharmonic of sharp keys', () => {
        expect(convertEnharmonic('C#')).toBe('Db');
        expect(convertEnharmonic('D#')).toBe('Eb');
        expect(convertEnharmonic('F#')).toBe('Gb');
        expect(convertEnharmonic('G#')).toBe('Ab');
        expect(convertEnharmonic('A#')).toBe('Bb');
    });

    it('should return the enharmonic of flat keys', () => {
        expect(convertEnharmonic('Db')).toBe('C#');
        expect(convertEnharmonic('Eb')).toBe('D#');
        expect(convertEnharmonic('Gb')).toBe('F#');
        expect(convertEnharmonic('Ab')).toBe('G#');
        expect(convertEnharmonic('Bb')).toBe('A#');
        expect(convertEnharmonic('Gbm')).toBe('F#m');
        expect(convertEnharmonic('Abm')).toBe('G#m');
    });

    it('should return empty string if input is invalid', () => {
        expect(convertEnharmonic('agfg')).toBe('');
        expect(convertEnharmonic('##')).toBe('');
        expect(convertEnharmonic('H')).toBe('');
        expect(convertEnharmonic('Z#')).toBe('');
        expect(convertEnharmonic('JJb')).toBe('');
        expect(convertEnharmonic('Bbb')).toBe('');
    });
});

describe('convertKeyModeIntToKey', () => {
    it('should return the key', () => {
        expect(convertKeyModeIntToKey(0, 1)).toBe('C');
        expect(convertKeyModeIntToKey(2, 0)).toBe('Dm');
        expect(convertKeyModeIntToKey(5, 1)).toBe('F');
    });

    it('should return empty string if wrong input is provided', () => {
        expect(convertKeyModeIntToKey(0, 2)).toBe('');
        expect(convertKeyModeIntToKey(-1, 1)).toBe('');
        expect(convertKeyModeIntToKey(undefined, 1)).toBe('');
        expect(convertKeyModeIntToKey(0, undefined)).toBe('');
        expect(convertKeyModeIntToKey(null, 1)).toBe('');
    });

    it('should return the correct enharmonic key', () => {
        expect(convertKeyModeIntToKey(6, 0)).toBe('F#m');
        expect(convertKeyModeIntToKey(8, 0)).toBe('G#m');
        expect(convertKeyModeIntToKey(1, 0)).toBe('C#m');
    });
});

describe('convertKeyToKeyModeInt', () => {
    it('should convert key to [key, mode]', () => {
        expect(convertKeyToKeyModeInt('C')).toStrictEqual([0, 1]);
        expect(convertKeyToKeyModeInt('Cm')).toStrictEqual([0, 0]);
        expect(convertKeyToKeyModeInt('Bm')).toStrictEqual([11, 0]);
        expect(convertKeyToKeyModeInt('A')).toStrictEqual([9, 1]);
    });

    it('should convert key to [key,mode] with correct enharmonic equivalent', () => {
        expect(convertKeyToKeyModeInt('C#m')).toStrictEqual([1, 0]);
        expect(convertKeyToKeyModeInt('G#m')).toStrictEqual([8, 0]);
        expect(convertKeyToKeyModeInt('F#m')).toStrictEqual([6, 0]);
    });

    it('should convert key to [key,mode] with correct enharmonic equivalent with wrong input enharmonic', () => {
        expect(convertKeyToKeyModeInt('Dbm')).toStrictEqual([1, 0]);
        expect(convertKeyToKeyModeInt('Abm')).toStrictEqual([8, 0]);
        expect(convertKeyToKeyModeInt('Gbm')).toStrictEqual([6, 0]);
    });

    it('should return [-1,-1] if the input is invalid', () => {
        expect(convertKeyToKeyModeInt('Hm')).toStrictEqual([-1, -1]);
        expect(convertKeyToKeyModeInt('123')).toStrictEqual([-1, -1]);
        expect(convertKeyToKeyModeInt('AM')).toStrictEqual([-1, -1]);
        expect(convertKeyToKeyModeInt('1m')).toStrictEqual([-1, -1]);
        expect(convertKeyToKeyModeInt('1')).toStrictEqual([-1, -1]);
    });

    it('should return [-1,-1] if the input is undefined', () => {
        expect(convertKeyToKeyModeInt('')).toStrictEqual([-1, -1]);
        // expect(convertKeyToKeyModeInt(undefined)).toStrictEqual([-1,-1])
        // expect(convertKeyToKeyModeInt(null)).toStrictEqual([-1,-1])
    });
});

describe('convertRelativeKey', () => {
    it('should convert major to minor key', () => {
        expect(convertRelativeKey('C')).toBe('Am');
        expect(convertRelativeKey('Db')).toBe('Bbm');
        expect(convertRelativeKey('D')).toBe('Bm');
        expect(convertRelativeKey('Eb')).toBe('Cm');
        expect(convertRelativeKey('E')).toBe('C#m');
        expect(convertRelativeKey('F')).toBe('Dm');
        expect(convertRelativeKey('Gb')).toBe('Ebm');
        expect(convertRelativeKey('G')).toBe('Em');
        expect(convertRelativeKey('Ab')).toBe('Fm');
        expect(convertRelativeKey('A')).toBe('F#m');
        expect(convertRelativeKey('Bb')).toBe('Gm');
        expect(convertRelativeKey('B')).toBe('G#m');
    });

    it('should convert minor to major key', () => {
        expect(convertRelativeKey('Am')).toBe('C');
        expect(convertRelativeKey('Bbm')).toBe('Db');
        expect(convertRelativeKey('Bm')).toBe('D');
        expect(convertRelativeKey('Cm')).toBe('Eb');
        expect(convertRelativeKey('C#m')).toBe('E');
        expect(convertRelativeKey('Dm')).toBe('F');
        expect(convertRelativeKey('Ebm')).toBe('Gb');
        expect(convertRelativeKey('Em')).toBe('G');
        expect(convertRelativeKey('Fm')).toBe('Ab');
        expect(convertRelativeKey('F#m')).toBe('A');
        expect(convertRelativeKey('Gm')).toBe('Bb');
        expect(convertRelativeKey('G#m')).toBe('B');
    });

    it("should return empty string if it's invalid", () => {
        expect(convertRelativeKey('1234')).toBe('');
        expect(convertRelativeKey('AM')).toBe('');
        expect(convertRelativeKey('Hm')).toBe('');
    });
});
