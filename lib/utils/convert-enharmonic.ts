export default function convertEnharmonic(keyString: string): string {
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

    type EnharmonicPair = {
        [field: string]: string;
    };

    const enharmonicPair: EnharmonicPair = {
        Db: 'C#',
        Eb: 'D#',
        Gb: 'F#',
        Ab: 'G#',
        Bb: 'A#',
    };

    const result =
        accidental === '#'
            ? Object.keys(enharmonicPair).find((element) => enharmonicPair[element] === keyString)
            : enharmonicPair[keyString];

    return result + (modeString ? modeString : '');
}
