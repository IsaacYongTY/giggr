import { noteArray } from 'common/constants';

export default function convertKeyToKeyModeInt(keyString: string): number[] {
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
}
