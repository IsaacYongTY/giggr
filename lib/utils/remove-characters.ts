export function isEscapedCharacter(char: string) {
    let regexEscapedCharacters = '[\\^$.|?*+()';
    return regexEscapedCharacters.split('').indexOf(char) > -1;
}

export function addBackSlashToEscapingCharactersArray(
    strArray: string[]
): string[] {
    return strArray.map((char) =>
        isEscapedCharacter(char) ? `\\${char}` : char
    );
}

export default function removeCharacters(
    stringsToRemoveArray: string[],
    text: string
): string {
    if (stringsToRemoveArray.length === 0) return text;

    const regexString =
        addBackSlashToEscapingCharactersArray(stringsToRemoveArray);

    let stringsToRemoveRegex = new RegExp(regexString.join('|'), 'g');
    return text.replace(stringsToRemoveRegex, '');
}
