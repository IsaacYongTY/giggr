interface KeyInfo {
    id: number;
    key: string;
    degree: number;
    isSharp: boolean;
}

export const renderSpacing = (
    spacing: number,
    chord: string,
    spaceChar = ' '
) => {
    if (chord.length > spacing || spacing < 0) return '';
    return spaceChar.repeat(spacing - (chord.length - 1));
};

export const keyMap: KeyInfo[] = [
    {
        id: 0,
        key: 'C',
        degree: 0,
        isSharp: true,
    },
    {
        id: 7,
        key: 'G',
        degree: 1,
        isSharp: true,
    },
    {
        id: 2,
        key: 'D',
        degree: 2,
        isSharp: true,
    },
    {
        id: 9,
        key: 'A',
        degree: 3,
        isSharp: true,
    },
    {
        id: 4,
        key: 'E',
        degree: 4,
        isSharp: true,
    },
    {
        id: 11,
        key: 'B',
        degree: 5,
        isSharp: true,
    },
    {
        id: 12,
        key: 'F#',
        degree: 6,
        isSharp: true,
    },
    {
        id: 5,
        key: 'F',
        degree: 1,
        isSharp: false,
    },
    {
        id: 10,
        key: 'Bb',
        degree: 2,
        isSharp: false,
    },
    {
        id: 3,
        key: 'Eb',
        degree: 3,
        isSharp: false,
    },
    {
        id: 8,
        key: 'Ab',
        degree: 4,
        isSharp: false,
    },
    {
        id: 1,
        key: 'Db',
        degree: 5,
        isSharp: false,
    },
    {
        id: 6,
        key: 'Gb',
        degree: 6,
        isSharp: false,
    },
];

export const getNotesInKey = (inputKey: number): string[] => {
    const resultKey = keyMap.find((element) => element.id === inputKey);

    if (!resultKey) {
        return [];
    }

    const { key, degree, isSharp }: KeyInfo = resultKey || {};

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
            ''
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
    progression: string
): string[] {
    const validInputRegex = /[^1-7b#Mm(dim7)]/g;
    const containInvalidInput = progression.search(validInputRegex) > -1;
    const progressionArray = progression.match(
        /(b[1-7])|([1-6]m)|([1-6]M)|(7dim7)|[1-7]/g
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

export const fullBarProg = function (
    key: number,
    progression: string,
    space: number
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

export const halfBarProg = function (
    key: number,
    progression: string,
    space: number
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
