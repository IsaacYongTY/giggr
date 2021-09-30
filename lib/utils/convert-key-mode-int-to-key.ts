import convertEnharmonic from './convert-enharmonic';
import { noteArray } from '../data/data';

export default function convertKeyModeIntToKey(
    key: number | undefined | null,
    mode: number | undefined | null
): string {
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
}
