import { keyMap } from './constants';

export const renderSpacing = (
    spacing: number,
    chord: string,
    spaceChar = ' ',
) => {
    if (chord.length > spacing || spacing < 0) return '';
    return spaceChar.repeat(spacing - (chord.length - 1));
};

export const getNotesInKey = (inputKey: number): string[] => {
    const resultKey = keyMap.find((element) => element.id === inputKey);

    if (!resultKey) {
        return [];
    }

    const { key, degree, isSharp } = resultKey || {};

    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const keyIndex = notes.indexOf(key[0]);

    const reshuffledNotes = notes
        .slice(keyIndex)
        .concat(notes.slice(0, keyIndex));

    const accidental = isSharp ? '#' : 'b';

    let noteIndex = isSharp ? 6 : 3;

    // 6 -> 2 -> 5 -> 1
    let i = 0;
    while (i < degree) {
        reshuffledNotes[noteIndex] += accidental;

        if (isSharp) {
            noteIndex += 3;

            if (noteIndex > 6) {
                noteIndex -= notes.length;
            }
        } else {
            noteIndex -= 3;
            if (noteIndex < 0) {
                noteIndex += notes.length;
            }
        }
        i++;
    }
    return reshuffledNotes;
};

export function modifyChordSuffix(chordString: string, key: number): string {
    const notesInKeyArray = getNotesInKey(key);
    if (chordString[0] === 'b') {
        const [accidental, chordNum] = chordString.split('');
        const keyIndex = parseInt(chordNum) - 1;

        return (notesInKeyArray[keyIndex] + accidental).replace(
            /(#b)|(b#)/,
            '',
        );
    }

    const chordNum = chordString.slice(0, 1);
    const suffix = chordString.slice(1);
    const keyIndex = parseInt(chordNum) - 1;

    if (suffix === 'm') {
        return notesInKeyArray[keyIndex] + suffix;
    }

    if (suffix === 'M') {
        return notesInKeyArray[keyIndex].replace(/m/, '');
    }

    if (suffix === 'dim7') {
        return notesInKeyArray[keyIndex] + 'dim7';
    }

    return '';
}

export const addFamilyChordSuffix = function (chordNum: number, key: number) {
    const notesInKeyArray = getNotesInKey(key);
    const keyIndex = chordNum - 1;
    if (chordNum === 3 || chordNum === 6) {
        return notesInKeyArray[keyIndex] + 'm';
    }

    if (chordNum === 2) {
        return notesInKeyArray[keyIndex] + 'm7';
    }

    if (chordNum === 7) {
        return notesInKeyArray[keyIndex] + 'dim7';
    }

    return notesInKeyArray[keyIndex];
};

export function assignKeyToProgression(
    key: number,
    progression: string,
): string[] {
    const validInputRegex = /[^1-7b#Mm(dim7)]/g;
    const containInvalidInput = progression.search(validInputRegex) > -1;
    const progressionArray = progression.match(
        /(b[1-7])|([1-6]m)|([1-6]M)|(7dim7)|[1-7]/g,
    );

    if (key < 0 || key > 12 || containInvalidInput || !progressionArray) {
        return [];
    }

    return progressionArray.map((chordString: string) => {
        // If explicitly specified
        if (chordString.length > 1) {
            return modifyChordSuffix(chordString, key);
        }

        const chordNum = parseInt(chordString);

        //default family chords
        return addFamilyChordSuffix(chordNum, key);
    });
}

export const generateFullBarProgression = function (
    key: number,
    progression: string,
    space: number,
) {
    if (key < 0 || key > 12 || space < 0 || !progression) {
        return '';
    }

    const chordProgression = assignKeyToProgression(key, progression);

    const resultString = chordProgression.reduce((acc, chord, index) => {
        let barString = `| [${chord}]` + renderSpacing(space, chord);

        if ((index + 1) % 4 === 0 && index < chordProgression.length - 1) {
            barString += `|\n`; // Close and go to next line
        }

        return acc + barString;
    }, '');

    return resultString + '|';
};

export const generateHalfBarProgression = function (
    key: number,
    progression: string,
    space: number,
) {
    if (key < 0 || key > 12 || space < 0 || !progression) {
        return '';
    }

    if (space % 2 === 1) {
        space += 1;
    }

    const chordProgression = assignKeyToProgression(key, progression);
    const halfSpace = Math.ceil(space / 2);

    const resultString = chordProgression.reduce((acc, chord, index) => {
        const isFirstChordInBar = index % 2 === 0;

        let barString = '';

        if (isFirstChordInBar) {
            barString += '| ';
        }

        barString += `[${chord}]` + renderSpacing(halfSpace, chord);

        if ((index + 1) % 4 === 0 && index < chordProgression.length - 1) {
            barString += `|\n`; // Ending bar line every 4 chords
        }

        return acc + barString;
    }, '');

    const isOddLength = chordProgression.length % 2 !== 0;

    if (isOddLength) {
        const placeholderChord = '[ ]';
        const lastChord = chordProgression[chordProgression.length - 1];
        const totalSpace = space + placeholderChord.length;

        return (
            resultString.trimEnd() + `${renderSpacing(totalSpace, lastChord)}|`
        );
    }

    return resultString + '|';
};

export const checkIsValidProgression = (progression: string) => {
    if (!progression) {
        throw Error('Please input progression');
    }

    const invalidCharactersRegex = /[^1-7#bmM]/;
    const isInvalidProgression = invalidCharactersRegex.test(progression);

    const invalidGroupingRegex = /(mm)|(b#)|(#b)|(7m)/i;
    const isInvalidGrouping = invalidGroupingRegex.test(progression);

    if (isInvalidProgression) {
        throw Error(
            'Input is invalid. Valid characters are 1-7, b, #, m, and M',
        );
    }

    if (isInvalidGrouping) {
        throw Error('Input is invalid. "mm", "b#","#b", "7m" are not valid');
    }

    const invalidEndChar = /^.+[b#]$/;
    const isInvalidEndChar = invalidEndChar.test(progression);

    if (isInvalidEndChar) {
        throw Error('"b" and "#" must come before a number');
    }

    const invalidStartChar = /^[mM].+/;
    const isInvalidStartChar = invalidStartChar.test(progression);

    if (isInvalidStartChar) {
        throw Error('"m" and "M" must come after a number');
    }
};
