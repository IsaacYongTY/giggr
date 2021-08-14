import { majorKeyArray, minorKeyArray } from '../data/data';

export default function convertRelativeKey(keyString: string): string {
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
}
